import {useFetch} from "@vueuse/core";
import {from, Observable} from "rxjs";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "http://localhost:3000/api";

export async function fetchAPI(endpoint: string) {
	const {data, error} = await useFetch(`${BASE_URL}/${endpoint}`).json();
	if (error.value) {
		throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
	}
	return data.value;
}

export function fetchAPIObservable(endpoint: string): Observable<any> {
	const fetchObservable = from(useFetch(`${BASE_URL}/${endpoint}`).json());

	return new Observable((observer) => {
		fetchObservable.subscribe({
			next: ({data, error}) => {
				console.log(data.value);

				if (error.value) {
					observer.error(new Error(`Errore durante la richiesta API: ${error.value.message}`));
				} else {
					observer.next(data.value);
					observer.complete();
				}
			},
			error: (err) => observer.error(err),
		});
	});
}
