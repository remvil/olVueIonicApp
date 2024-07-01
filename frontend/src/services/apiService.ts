import {ExtAPIResponse} from "../models/apiData";
import {useFetch} from "@vueuse/core";
import {from, Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Md5} from "ts-md5";
import {presentToast} from "./ionicComponentsService";
import {getToken, removeStoredUser, setStoredUser} from "@/services/storageService";

const {VITE_API_SALT, VITE_DEMO_API_BASE_URL, VITE_PROD_API_BASE_URL} = import.meta.env;

export function fetchAPIPromise(endpoint: string) {
	return useFetch(`${VITE_DEMO_API_BASE_URL}/${endpoint}`)
		.json()
		.then(({data, error}) => {
			if (error.value) {
				throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
			}
			return data.value;
		});
}

export function fetchAPIObservable(endpoint: string, options: any = {}): Observable<any> {
	const authToken = getToken();
	if (!authToken) {
		presentToast("bottom", "You are not logged in", "danger");
		return of();
	}

	const headers = {
		Token: `${authToken}`,
		...options.headers,
	};
	return from(useFetch(`${VITE_DEMO_API_BASE_URL}/${endpoint}`, headers).json()).pipe(
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
	credentials.password = Md5.hashStr(Md5.hashStr(credentials.password) + VITE_API_SALT);

	const {data, error} = await useFetch<any>(`${VITE_PROD_API_BASE_URL}/login`).post(credentials);

	const apiResp: ExtAPIResponse = JSON.parse(data.value);
	if (error.value || !apiResp) {
		removeStoredUser();
		throw new Error("Login failed");
	}

	// Wrong credential case
	if (apiResp.code === -1) {
		removeStoredUser();
	}

	// Success authentication
	if (apiResp.code === 200) {
		setStoredUser({name: "Max", token: apiResp.data});
	}

	return data.value;
}

export async function logout() {
	removeStoredUser();
	presentToast("bottom", "Logged out", "success");
}
