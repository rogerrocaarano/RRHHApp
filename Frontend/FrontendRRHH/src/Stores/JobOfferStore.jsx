import create from "zustand";
import {
	getOffers,
	createOffer,
	getOneOffer,
	updateOffer,
	publishOffer,
} from "../Services/JobOffersService";

export const useJobOfferStore = create((set, get) => ({
	allOffers: [],
	selectOffer: {},
	loading: false,
	error: null,
	pendingOffers: [],
	getAllOffers: async () => {
		set({ loading: true });
		try {
			const response = await getOffers();
			set({ allOffers: response });
		} catch (error) {
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
	createNewOffer: async (newOffer) => {
		set({ loading: true });
		try {
			await createOffer(newOffer);
			get().getAllOffers(); //vuelve a pedir todas las ofertas
			return "succes";
		} catch (error) {
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
	getPenndinOffers: () => {
		const offersInDb = get().allOffers;
		let pendings = offersInDb.filter(
			(offer) => offer.status === "Pending approval"
		);
		pendings.reverse();
		set({ pendingOffers: pendings });
	},
	getSelectOffer: async (offerId) => {
		set({ loading: true });
		try {
			const response = await getOneOffer(offerId);
			set({ selectOffer: response });
		} catch (error) {
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
	editOffer: async (offerToEdit) => {
		set({ loading: true });
		try {
			await updateOffer(offerToEdit);
			get().getAllOffers();
			return "succes";
		} catch (error) {
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
	removeSelectOffer: () => {
		set({ selectOffer: {} });
	},
	deleteOffer: async (offerId) => {
		console.log("se borraria la oferta con id", offerId);
		// set({ loading: true });

		// try {
		// 	await deleteOfferReq(offerId); // No exitste, ponerle el nobre que correspnda
		// 	get().getAllOffers(); //vuelve a pedir todas las ofertas
		// 	return "La oferta se ha borrado con exito";
		// } catch (err) {
		// 	console.log("el error en la edicion fue", err);
		// 	return err;
		// } finally {
		// 	set({ loading: true });
		// }
	},
	publishJobOffer: async (offerId) => {
		set({ loading: true });
		try {
			const response = await publishOffer(offerId);
			console.log(response);
			get.getAllOffers();
			return "succes";
		} catch (error) {
			console.log(error);
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
}));
