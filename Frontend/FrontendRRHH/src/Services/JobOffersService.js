import { apiJobs } from "./BaseApi";

//Servicio de manejo de APi sobre Ofertas

//Traer todas las Offertas
export const getOffers = async () => {
	try {
		const { data } = await apiJobs.get("/");
		console.log("Response de oferta", data);
		return data;
	} catch (err) {
		console.log("Error al trater las Ofertas:", err);
	}
};

//Crear Oferta
export const createOffer = async (newOffer) => {
	try {
		const { data } = await apiJobs.post("/Create", newOffer);
		console.log("Response de oferta", data);
	} catch (err) {
		console.log("Error al crear Oferta:", err);
	}
};

//Traer Una oferta
export const getOneOffer = async (offerId) => {
	try {
		const { data } = await apiJobs.get("/", offerId);
		console.log("Response de oferta", { ...data[0] });
		return { ...data[0] };
	} catch (err) {
		console.log("Error al trater las Ofertas:", err);
	}
};

//edita una oferta
export const updateOffer = async (offerToEdit) => {
	// try {
	// 	const { data } = await apiJobs.post("/updateEndPoint", newOffer);
	// 	console.log("Response de oferta", data);
	// } catch (err) {
	// 	console.log("Error al crear Oferta:", err);
	// }
	console.log("aca se editaria con esta data", offerToEdit);
};
