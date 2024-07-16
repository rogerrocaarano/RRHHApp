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
	const { getAllOffers, loading, error, selectOffer, allOffers } =
		useJobOfferStore();

	useEffect(() => {
		if (!userLogged.user.userName) navigate("/");
		// Proteje la ruta, si no esta logeado reenvia
		getAllOffers(); //ejecuta la funcion que llama a todas las ofertas y las guarda en el store
	}, [getAllOffers, navigate, userLogged]);

	useEffect(() => {
		console.log("en el view", selectOffer);
		toggleJobFormModal();
	}, [selectOffer]);

	return (
		<section className='w-[80%]  flex flex-col justify-around overflow-hidden pl-10 pt-2'>
			<section className=' h-24 w-10/12 -ml-4 flex justify-start gap-16 items-center '>
				<Buscador />

				{
					//boton para crear oferta, no se muestra para candidatos
					userLogged.roles &&
						userLogged.roles.length > 0 &&
						userLogged.roles.some((role) => role.name !== "Candidate") && (
							<BotonCrearOferta toggleJobFormModal={toggleJobFormModal} />
						)
				}
			</section>

			{/* div de abajo contiene el popUp del Formulario */}
			<div
				className={`${
					toggleForm ? "block" : "hidden"
				} absolute top-0 left-0 w-screen h-screen bg-zinc-900/65 z-10 `}
			>
				{
					//Formulario que funciona tipo popUp
					toggleForm && <OfertForm toggleJobFormModal={toggleJobFormModal} />
				}
			</div>
			{/* Secciones de ofertas con scroll  */}
			<section className='flex flex-col m-4 h-[80%]'>
				<h2 className={`${loading || error ? "flex" : "hidden"}`}>
					{loading && "Cargando... "}
					{error && error}
				</h2>

				{userLogged.roles.some((role) => role.name !== "Candidate") &&
					!loading &&
					!error && (
						//Solo se muestra si no esta logeado un candidato, si se termino de cargar la peticion y no hay errores
						<>
							<h2 className='h-fit text-xl font-bold'>
								Ofertas Pendientes de Aprobacion
							</h2>
							<SecOfertas statusOfer='Pending' allOffers={allOffers} />
						</>
					)}

				{!loading && !error && (
					<>
						<h2 className='h-fit text-xl font-bold'>Ofertas Activas</h2>
						<SecOfertas statusOfer='Active' allOffers={allOffers} />
					</>
				)}

				{userLogged.roles.every((role) => role.name === "Candidate") &&
					!loading &&
					!error && (
						//Solo se muestra si esta logeado un candidato, si se termino de cargar la peticion y no hay errores
						<>
							<h2 className='h-fit text-xl font-bold'>
								Ofertas con postulacion efectuada
							</h2>
							<SecOfertas statusOfer='Postulate' allOffers={allOffers} />
						</>
					)}
			</section>
		</section>
	);
}
