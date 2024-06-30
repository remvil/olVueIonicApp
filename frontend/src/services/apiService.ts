import {ExtAPIResponse} from "./../models/apiResponses";
import {useFetch} from "@vueuse/core";
import {from, Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Md5} from "ts-md5";
import {presentToast} from "./ionicComponentsService";

const BASE_URL = "http://localhost:3000/api";

export function fetchAPIPromise(endpoint: string) {
	return useFetch(`${BASE_URL}/${endpoint}`)
		.json()
		.then(({data, error}) => {
			console.log(data);

			if (error.value) {
				throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
			}
			return data.value;
		});
}

export function fetchAPIObservable(endpoint: string, options: any = {}): Observable<any> {
	const authToken = localStorage.getItem("authToken");
	if (!authToken) {
		presentToast("bottom", "You are not logged in", "danger");
		return of(); // TODO voi of() mgmt
	}

	const headers = {
		Token: `${authToken}`,
		...options.headers,
	};
	return from(useFetch(`${BASE_URL}/${endpoint}`, headers).json()).pipe(
		map(({data, error}) => {
			if (error.value) {
				throw new Error(`Obs API Error: ${error.value.message}`);
			}
			return data.value;
		}),
		catchError((error) => {
			console.error("Obs API Error catched:", error);
			return throwError(error);
		})
	);
}

export async function login(credentials: {username: string; password: string}) {
	credentials.password = Md5.hashStr(credentials.password);
	credentials.password = "3394296ad97b4e2073c3934254526136";
	const {data, error} = await useFetch<any>("http://185.169.239.178:8180/localsenseadmin/login").post(credentials);

	const apiResp: ExtAPIResponse = JSON.parse(data.value);
	if (error.value || !apiResp) {
		removeToken();
		throw new Error("Login failed");
	}

	// Wrong credential case
	if (apiResp.code === -1) {
		removeToken();
	}

	// Success authentication
	if (apiResp.code === 200) {
		localStorage.setItem("authToken", apiResp.data);
	}

	return data.value;
}

// Return authToken
export function getToken() {
	return localStorage.getItem("authToken");
}

export function removeToken() {
	return localStorage.removeItem("authToken");
}

export function handleLogout() {
	removeToken();
}
