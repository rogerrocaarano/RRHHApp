/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//componentes
import { SecOfertas } from "../Components/OfertaDeEmpleo/SecOfertas";
import { Buscador } from "../Components/CommonComponents/Buscador";
import { BotonCrearOferta } from "../Components/CommonComponents/BotonCrearOferta";
import { OfertForm } from "../Components/OfertaDeEmpleo/OfertForm";
//Store
import { useJobOfferStore } from "../Stores/JobOfferStore";
import { UserStore } from "../Stores/userStore";
// hook
import { useJobOffer } from "../Hooks/useJobOffer";

//componente de react
export function OfferView() {
	const navigate = useNavigate();
	const { toggleForm, toggleJobFormModal } = useJobOffer();
	const { userLogged } = UserStore();
	const { getAllOffers, loading, error, selectOffer } = useJobOfferStore();

	useEffect(() => {
		if (!userLogged.userName) navigate("/login");
		// Proteje la ruta, si no esta logeado reenvia
		getAllOffers(); //ejecuta la funcion que llama a todas las ofertas y las guarda en el store
	}, [getAllOffers, navigate, userLogged.userName]);

	useEffect(() => {
		toggleJobFormModal();
	}, [selectOffer]);

	return (
		<section className='w-[80%]  flex flex-col justify-around overflow-hidden pl-10 pt-2'>
			<section className=' h-24 w-10/12 -ml-4 flex justify-start gap-16 items-center '>
				<Buscador />
				{userLogged.userName !== "candidate" && (
					<BotonCrearOferta toggleJobFormModal={toggleJobFormModal} />
				)}
			</section>

			{/* div de abajo contiene el popUp del Formulario */}
			<div
				className={`${
					toggleForm ? "block" : "hidden"
				} absolute top-0 left-0 w-screen h-screen bg-zinc-900/65 z-10 `}
			>
				{toggleForm && (
					<OfertForm
						toggleJobFormModal={toggleJobFormModal}
						selectOffer={selectOffer}
					/>
				)}
			</div>
			{/* Secciones de ofertas con scroll  */}
			<section className='flex flex-col m-4 h-[80%]'>
				<h2 className={`${loading || error ? "flex" : "hidden"}`}>
					{loading && "Cargando... "}
					{error && error}
				</h2>

				{userLogged.userName != "candidate" && !loading && !error && (
					//Solo se muestra si no esta logeado un candidato, si se termino de cargar la peticion y no hay errores
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

				{userLogged.userName == "candidate" && !loading && !error && (
					//Solo se muestra si esta logeado un candidato, si se termino de cargar la peticion y no hay errores
					<>
						<h2 className='h-fit text-xl font-bold'>
							Ofertas con postulacion efectuada
						</h2>
						<SecOfertas statusOfer='Postulate' />
					</>
				)}
			</section>
		</section>
	);
}
