import { createOffer } from "../Services/JobOffersService";

export function JobOffersHandler() {
	const createOfferHandler = async (data) => {
		const response = await createOffer(data);
		return response;
	};

	return { createOfferHandler };
}
