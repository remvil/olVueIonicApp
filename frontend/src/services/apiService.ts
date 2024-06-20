import {useFetch} from "@vueuse/core";
import {from, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

const BASE_URL = "http://localhost:3000/api";

export function fetchAPIPromise(endpoint: string) {
	return useFetch(`${BASE_URL}/${endpoint}`)
		.json()
		.then(({data, error}) => {
			if (error.value) {
				throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
			}
			return data.value;
		});
}

export function fetchAPIObservable(endpoint: string): Observable<any> {
	return from(useFetch(`${BASE_URL}/${endpoint}`).json()).pipe(
		map(({data, error}) => {
			if (error.value) {
				throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
			}
			return data.value;
		}),
		catchError((error) => {
			console.error("Errore durante la richiesta API:", error);
			return throwError(error);
		})
	);
}
