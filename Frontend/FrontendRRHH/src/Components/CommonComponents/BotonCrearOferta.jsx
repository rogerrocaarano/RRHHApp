/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PlusIcon } from "../../assets/icons/PlusIcon";
export function BotonCrearOferta({ toggleFunction }) {
	return (
		<div className=' bg-gray-100 flex gap-4 items-center'>
			<h3 className='text-2xl font-bold'>Crear Oferta </h3>
			<button
				className='bg-blue-500 text-white font-bold p-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
				onClick={() => toggleFunction()}
			>
				<PlusIcon
					className={
						"h-6 w-6 hover:rotate-90 transition-transform duration-300"
					}
				/>
			</button>
		</div>
	);
}
