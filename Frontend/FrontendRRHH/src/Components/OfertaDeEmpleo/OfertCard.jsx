/* eslint-disable react/prop-types */
import { UserStore } from "../../Stores/userStore";
//importo componentes botones
import { RedButton } from "../CommonComponents/RedButton";
import { BlueButton } from "../CommonComponents/BlueButton";
import { GreenButton } from "../CommonComponents/GreenButton";

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
						//ofertas activas
						<>
							<RedButton buttonContent={"Delete"} />
							<BlueButton buttonContent={"Cerrar Oferta"} />
						</>
					) : !review ? (
						//ofertas pendientes
						<>
							<RedButton buttonContent={"Retirar Oferta"} />

							{userLogged.role === "Recrutier" ? (
								<GreenButton buttonContent={"Editar ofer sin revision"} />
							) : (
								<GreenButton buttonContent={"Revisar"} />
							)}
						</>
					) : (
						<GreenButton buttonContent={"Ver Revisión"} />
					)
				) : !postulate ? (
					//SOLO muestra si esta logeado el candidato
					<GreenButton buttonContent={"Ver Oferta"} />
				) : (
					<RedButton buttonContent={"Retirar Postulación"} />
				)}
			</div>
		</article>
	);
}
