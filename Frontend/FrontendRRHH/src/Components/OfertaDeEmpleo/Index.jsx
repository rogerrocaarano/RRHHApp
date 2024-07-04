/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
//componentes
import { SecOfertas } from "./SecOfertas";
import { Buscador } from "../CommonComponents/Buscador";
import { BotonBuscador } from "../CommonComponents/BotonBuscador";
import { OfertForm } from "./OfertForm";
//Hook
import { useJobOfferStore } from "../../Stores/JobOfferStore";

//componente de react
export function OfertView() {
	const [toggleForm, setToggleForm] = useState(false);
	const { getAllOffers, loading, error } = useJobOfferStore();

	useEffect(() => {
		getAllOffers();
	}, []); //solo se ejecuta el efecto cuando carga la app

	const toggleFunction = () => {
		// abre y cierra la vista del formulario
		setToggleForm(!toggleForm);
	};
	return (
		<section className='w-[80%] h-fit  overflow-hidden relative'>
			<section className=' h-24 w-10/12 -ml-4 flex justify-around items-center'>
				<Buscador />
				<BotonBuscador toggleFunction={toggleFunction} />
			</section>

			{/* div de abajo contiene el popUp del Formulario */}
			<div
				className={`${
					toggleForm ? "block" : "hidden"
				} absolute top-0 left-0 w-screen h-screenn bg-zinc-900/65 z-10 -ml-[20%]`}
			>
				<OfertForm toggleFunction={toggleFunction} />
			</div>
			{/* Secciones de ofertas con scroll  */}
			<section className='flex flex-col m-4 h-[62%]'>
				<h2 className={`${loading || error ? "flex" : "hidden"}`}>
					{loading && "Cargando... "}
					{error && error}
				</h2>

				{!loading && !error && (
					<>
						<h2 className='h-fit text-xl font-bold'>
							Ofertas Pendientes de Aprobacion
						</h2>
						<SecOfertas statusOfer='Pending' />
					</>
				)}

				{!loading && !error && (
					<>
						<h2 className='h-fit text-xl font-bold'>Ofertas Activas</h2>
						<SecOfertas statusOfer='Active' />
					</>
				)}
			</section>
		</section>
	);
}
