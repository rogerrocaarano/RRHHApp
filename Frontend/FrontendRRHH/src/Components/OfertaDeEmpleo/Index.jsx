import { useState, useEffect } from "react";
//componentes
import { SecOfertas } from "./SecOfertas";
import { Buscador } from "../CommonComponents/Buscador";
import { BotonBuscador } from "../CommonComponents/BotonBuscador";
import { OfertForm } from "./OfertForm";
//Hook
import { useJobOffersHandler } from "../../hooks/useJobOffers";

//componente de react
export function OfertView() {
	const [toggleForm, setToggleForm] = useState(false);
	const [allOffers, setAllOffers] = useState(null);
	const { getAllOffers } = useJobOffersHandler();

	useEffect(() => {
		//funcion que consume el hook
		const fetchOffers = async () => {
			const allOffersInDb = await getAllOffers();
			setAllOffers(allOffersInDb);
		};

		fetchOffers();
	}, [getAllOffers]);
	console.log("todas las ofertas aca", allOffers);

	const toggleFunction = () => {
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
				<h2 className='h-fit text-xl font-bold'>
					Ofertas Pendientes de Aprobacion
				</h2>
				<SecOfertas statusOfer='Pending' />

				<h2 className='h-fit text-xl font-bold'>Ofertas Activas</h2>
				<SecOfertas statusOfer='Active' />
			</section>
		</section>
	);
}
