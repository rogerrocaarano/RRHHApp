import { createOffer, getOffers } from "../Services/JobOffersService";
import { useState, useEffect } from "react";

// Custom hook para manejo de ofertas
export function useJobOffersHandler() {
	// Estados internos del hook
	const [allOffers, setAllOffers] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pendingOffers, setPendingOffers] = useState(null);
	// Función interna: creación de oferta
	const createNewOffer = async (data) => {
		try {
			setLoading(true);
			await createOffer(data);
			await getAllOffers(); // Vuelve a ejecutar la función que llama a todas las ofertas para renderizar en el index de ofertaDeEmpleo
			await getPenndinOffers();
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	// Función interna: obtener todas las ofertas
	const getAllOffers = async () => {
		try {
			setLoading(true);
			const response = await getOffers();
			setAllOffers(response);
			return response;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	/*funcion de filtrado ->
	recibe la propiedad cual filtrar y el valor por cual filtrar, por ultimo recibe un parametro referente a que filtre por " == " o no, el cual es BOLEANO 
	*/
	const filtredOfferBy = (param, value, forIgual) => {
		let filtredOffer;
		forIgual == "true"
			? (filtredOffer = allOffers?.filter((offer) => offer.param == value))
			: (filtredOffer = allOffers?.filter((offer) => offer.param != value));
		return filtredOffer;
	};

	const getPenndinOffers = () => {
		const pending = filtredOfferBy("status", "Pending approval", true);
		setPendingOffers(pending);
	};
	console.log("ofertas pendientes desde el hook", pendingOffers);

	useEffect(() => {
		getAllOffers().then(() => {
			getPenndinOffers();
		});
	}, []);

	return {
		// createNewOffer,
		// getAllOffers,
		// allOffers,
		// loading,
		// error,
		// pendingOffers,
		filtredOfferBy,
		// getPenndinOffers,
	};
}
