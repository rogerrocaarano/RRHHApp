/* eslint-disable react/prop-types */
import { OfertCard } from "./OfertCard";

export function SecOfertas({ statusOfer }) {
	// statusOfer recibe dos posibles strings "Pending" "Active", segun los cual renderiza una u otra cosa
	return (
		<section className='w-10/12 m-auto my-2 border-4 rounded-xl flex flex-col gap-2 max-h-48 overflow-y-scroll p-2 px-8 bg-slate-200'>
			{statusOfer == "Pending" ? (
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
			) : (
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
			)}
		</section>
	);
}
