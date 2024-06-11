// Importa Axios per effettuare le richieste HTTP
import axios from "axios";

// Definisci l'URL base delle API
const baseURL = "http://localhost:3000/api"; // Sostituisci con l'URL effettivo delle tue API

// Crea un'istanza di Axios con l'URL base predefinito
const api = axios.create({
	baseURL,
});

// Definisci le funzioni per le chiamate API
export const apiService = {
	// Esempio di funzione per ottenere dati da una risorsa
	async getResource(resource) {
		try {
			const response = await api.get(`/${resource}`);
			return response.data;
		} catch (error) {
			console.error("Errore durante la richiesta:", error);
			throw error;
		}
	},

	// Esempio di funzione per inviare dati a una risorsa
	// async postResource(resource, data) {
	// 	try {
	// 		const response = await api.post(`/${resource}`, data);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("Errore durante la richiesta:", error);
	// 		throw error;
	// 	}
	// },

	

	// Aggiungi qui altre funzioni per le chiamate API secondo necessità
};
