import { SecOfertas } from "./SecOfertas";
import { OfertForm } from "./OfertForm";
export function OfertView() {
	return (
		<section className='w-[80%] h-fit px-4 pt-24 overflow-hidden relative'>
			<div className='absolute top-0 left-0 w-screen h-screenn bg-zinc-900/65 z-10 -ml-[20%]'>
				<OfertForm />
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
