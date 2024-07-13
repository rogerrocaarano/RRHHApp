/* eslint-disable react/prop-types */
import { useJobOfferStore } from "../../Stores/JobOfferStore";

export function RedButton({ buttonContent, id }) {
	const { deleteOffer } = useJobOfferStore();

	return (
		<button
			className='border-2 shadow-lg h-full rounded-xl border-red-600 text-red-500 text-sm hover:bg-red-200 hover:text-red-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '
			onClick={() => deleteOffer(id)}
		>
			{buttonContent}
		</button>
	);
}
