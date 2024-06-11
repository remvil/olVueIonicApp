import {useFetch} from "@vueuse/core";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "http://ival-be:3000/api";

export async function fetchGeoJson(endpoint: string) {
	const {data, error} = await useFetch(`${BASE_URL}/${endpoint}`).json();
	if (error.value) {
		throw new Error(`Errore durante la richiesta API: ${error.value.message}`);
	}
	return data.value;
}
