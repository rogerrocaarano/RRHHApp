import { createOffer, getOffers } from "../Services/JobOffersService";

//Custom hook de manejo de ofertas
export function useJobOffersHandler() {
	//funcion interna de creacion recibe datos del form, no devuelve nada
	const createNewOffer = async (data) => {
		await createOffer(data); // Aquí debería ser await createOffer(data)
	};

	// Funcion interna no recibe parametros, devuelve todas las ofertas
	const getAllOffers = async () => {
		const response = await getOffers();
		return response;
	};

	return { createNewOffer, getAllOffers };
}
