/* eslint-disable react/prop-types */
import { UserStore } from "../../Stores/userStore";

export function OfertCard({ isPending, review, title, postulate }) {
	// isPending y postulate son booleanos, review puede recibir un String, y title es un String.
	// Conforme a lo que llega, si no es isPending, renderiza la card con los dos botones, sino solo con uno dependiendo si hay o no review.
	const { userLogged } = UserStore();

	return (
		<article className='h-12 w-full m-auto flex justify-between items-center border-2 rounded-xl px-4 py-2 bg-slate-100'>
			<strong>{title ? title : "Ofert Title"}</strong>
			<div className='h-full w-fit flex gap-2'>
				{userLogged.role !== "Candidate" ? (
					//seccion solo si no se es candidato, muestra cards activas y pendientes, depende la seccion que lo consuma
					!isPending ? (
						<>
							<button className='border-2 shadow-lg h-full rounded-xl border-red-600 text-red-500 text-sm hover:bg-red-200 hover:text-red-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
								Delete
							</button>
							<button className='border-2 shadow-lg h-full rounded-xl border-blue-600 text-blue-500 text-sm hover:bg-blue-200 hover:text-blue-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
								Cerrar Oferta
							</button>
						</>
					) : !review ? (
						<button className='border-2 shadow-lg h-full rounded-xl border-red-600 text-red-500 text-sm hover:bg-red-200 hover:text-red-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
							Retirar Oferta
						</button>
					) : (
						<button className='border-2 shadow-lg h-full rounded-xl border-green-600 text-green-500 text-sm hover:bg-green-200 hover:text-green-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
							Ver Revisión
						</button>
					)
				) : !postulate ? (
					<button className='border-2 shadow-lg h-full rounded-xl border-green-600 text-green-500 text-sm hover:bg-green-200 hover:text-green-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
						Ver Oferta
					</button>
				) : (
					<button className='border-2 shadow-lg h-full rounded-xl border-red-600 text-red-500 text-sm hover:bg-red-200 hover:text-red-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
						Retirar Postulación
					</button>
				)}
			</div>
		</article>
	);
}
