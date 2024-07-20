/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { OfertCard } from "./OfertCard";
import { useJobOfferStore } from "../../Stores/JobOfferStore";
import { useEffect } from "react";

// statusOfer recibe tres posibles strings "Pending" "Active" y "Postulate", segun los cual renderiza una u otra cosa
export function SecOfertas({ statusOfer, allOffers }) {
	const {
		getPenndinOffers,
		pendingOffers,
		publishedOffers,
		getPublishedOffers,
	} = useJobOfferStore();

	useEffect(() => {
		getPenndinOffers();
		getPublishedOffers();
	}, [allOffers]);

	const offers = statusOfer === "Pending" ? pendingOffers : publishedOffers; //segun el status, en offer habra ofertas pendientes, o ofertas aprobadas

	return (
		<section className='w-10/12 m-auto my-2 border-4 rounded-xl flex flex-col gap-2 max-h-56 overflow-y-scroll p-2 px-8 bg-slate-200'>
			{statusOfer == "Pending" &&
				offers?.length >= 1 &&
				offers
					.reverse()
					.map((offer) => (
						<OfertCard
							key={offer.id}
							title={offer.title}
							id={offer.id}
							isPending={true}
						/>
					))}
			{statusOfer == "Pending" && offers?.length < 1 && (
				//Se envia el estado de pendiente o no a cada oferta, y si tiene revision. Ambos Booleanos.
				//Si es pendin se mostrara en la seccion de pendientes, sino en activas

				<OfertCard
					title='No hay tareas en estado de Pendiente en la db '
					isPending={true}
				/>
			)}
			{statusOfer == "Active" &&
				offers?.length >= 1 &&
				offers.map((offer) => (
					<OfertCard
						key={offer.id}
						title={offer.title}
						id={offer.id}
						isPending={false}
					/>
				))}
			{
				statusOfer == "Active" && offers?.length < 1 && (
					<OfertCard
						title='No hay tareas en estado de Publicas y activas en la db '
						isPending={false}
					/>
				)
				//ELIMINAR LO DE ABAJO CUANDO HAYA OFERTAS APROBADAS
			}
			{statusOfer === "Postulate" && (
				//Solo llegan las ofertas a las que el candidato ya se postulo, y se pasa la postulacion como parametro
				<>
					<OfertCard
						title='Aún no hay ofertas a las que hayas postulado'
						isPending={false}
						postulate={true}
					/>
				</>
			)}
		</section>
	);
}
