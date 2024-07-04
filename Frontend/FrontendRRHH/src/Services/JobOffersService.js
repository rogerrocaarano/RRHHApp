import { api } from "./BaseApi";

//Servicio de manejo de APi sobre Ofertas

//Traer todas las Offertas
export const getOffers = async () => {
	try {
		const { data } = await api.get("/");
		console.log("Response de oferta", data);
		return data;
	} catch (err) {
		console.log("Error al trater las Ofertas:", err);
	}
};

//Crear Oferta
export const createOffer = async (newOffer) => {
	try {
		const { data } = await api.post("/Create", newOffer);
		console.log("Response de oferta", data);
	} catch (err) {
		console.log("Error al crear Oferta:", err);
	}
};
