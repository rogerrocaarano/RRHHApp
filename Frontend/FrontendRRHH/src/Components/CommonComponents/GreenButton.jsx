/* eslint-disable react/prop-types */
//hook

//store
import { useJobOfferStore } from "../../Stores/JobOfferStore";
//component

export function GreenButton({ buttonContent, offerId }) {
	const { getSelectOffer } = useJobOfferStore();

	const goToEdit = async () => {
		await getSelectOffer(offerId); //peticion del id al store
	};

	return (
		<>
			<button
				className='border-2 shadow-lg h-full rounded-xl border-green-600 text-green-500 text-sm hover:bg-green-200 hover:text-green-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '
				onClick={goToEdit}
			>
				{buttonContent}
			</button>
		</>
	);
}
