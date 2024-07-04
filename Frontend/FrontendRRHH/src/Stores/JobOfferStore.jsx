import create from "zustand";
import { getOffers, createOffer } from "../Services/JobOffersService";

export const useJobOfferStore = create((set, get) => ({
	allOffers: [],
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
			get().getAllOffers();
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
}));
