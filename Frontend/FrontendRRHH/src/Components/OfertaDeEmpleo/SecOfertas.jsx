/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { OfertCard } from "./OfertCard";
import { useJobOfferStore } from "../../Stores/JobOfferStore";
import { useEffect } from "react";

// statusOfer recibe tres posibles strings "Pending" "Active" y "Postulate", segun los cual renderiza una u otra cosa
export function SecOfertas({ statusOfer }) {
	const { getPenndinOffers, allOffers, pendingOffers } = useJobOfferStore();

	useEffect(() => {
		getPenndinOffers();
	}, [allOffers]);

	const offers =
		statusOfer === "Pending"
			? pendingOffers
			: allOffers.filter((off) => off.status === "Approval");

	return (
		<section className='w-10/12 m-auto my-2 border-4 rounded-xl flex flex-col gap-2 max-h-56 overflow-y-scroll p-2 px-8 bg-slate-200'>
			{statusOfer == "Pending" ? (
				offers?.length >= 1 ? (
					offers
						.reverse()
						.map((offer) => (
							<OfertCard key={offer.id} title={offer.title} isPending={true} />
						))
				) : (
					//Se envia el estado de pendiente o no a cada oferta, y si tiene revision. Ambos Booleanos.
					//Si es pendin se mostrara en la seccion de pendientes, sino en activas
					<>
						<OfertCard
							title='Busqueda de Desarrollador Frontend'
							isPending={true}
						/>
						<OfertCard
							title='Busqueda de Desarrollador Backend'
							isPending={true}
							review={true}
						/>
						<OfertCard title='Busqueda de Desarrollador C#' isPending={true} />
						<OfertCard
							title='Busqueda de Desarrollador Angular'
							isPending={true}
							review={true}
						/>
					</>
				)
			) : statusOfer == "Active" ? (
				<>
					<OfertCard
						title='Busqueda de Desarrollador Frontend'
						isPending={false}
					/>
					<OfertCard
						title='Busqueda de Desarrollador Backend'
						isPending={false}
					/>
					<OfertCard title='Busqueda de Desarrollador C#' isPending={false} />
					<OfertCard
						title='Busqueda de Desarrollador Angular'
						isPending={false}
					/>
				</>
			) : (
				//Solo llegan las ofertas a las que el candidato ya se postulo, y se pasa la postulacion como parametro
				<>
					<OfertCard
						title='Busqueda de Desarrollador Frontend'
						isPending={false}
						postulate={true}
					/>
					<OfertCard
						title='Busqueda de Desarrollador Backend'
						isPending={false}
						postulate={true}
					/>
					<OfertCard
						title='Busqueda de Desarrollador C#'
						isPending={false}
						postulate={true}
					/>
					<OfertCard
						title='Busqueda de Desarrollador Angular'
						isPending={false}
						postulate={true}
					/>
				</>
			)}
		</section>
	);
}
