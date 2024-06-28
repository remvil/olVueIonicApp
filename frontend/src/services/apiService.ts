import {useFetch} from "@vueuse/core";
import {from, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

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

export function fetchAPIObservable(endpoint: string, options: any ={}): Observable<any> {
	const authToken = localStorage.getItem('authToken');
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

export async function login(credentials: { username: string; password: string }) {
  const { data, error } = await useFetch<any>('http://185.169.239.178:8180/localsenseadmin/login').post(credentials);

  if (error.value || !data.value) {
    console.error(error.value);
    localStorage.removeItem('authToken'); // Cancella il token vecchio in caso di errore
    throw new Error('Login failed'); // Lancia un errore per gestire il fallimento del login nell'interfaccia utente
  } else {
		if(data.value.code === -1){
			console.log('non è riuscito'); return;
		}
    localStorage.setItem('authToken', data.value.token); // Memorizza il token
    return data.value; // Ritorna i dati di risposta per ulteriori operazioni
  }
}

// Funzione per impostare il token
export function setToken(token: string) {
  localStorage.setItem('authToken', token);
}

// Funzione per ottenere il token memorizzato
export function getToken() {
  return localStorage.getItem('authToken');
}