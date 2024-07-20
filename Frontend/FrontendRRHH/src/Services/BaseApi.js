import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const apiJobs = axios.create({
	baseURL: `${backendUrl}api/v1/JobOffers`,
	withCredentials: true, // Esto habilita el envío de cookies
});

export const apiUSers = axios.create({
	baseURL: `${backendUrl}`,
	withCredentials: true, // Esto habilita el envío de cookies
});
