import { Aside } from "./Components/CommonComponents/Aside";
import { Navbar } from "./Components/CommonComponents/Navbar.1";
import { SecOfertas } from "./Components/OfertaDeEmpleo/SecOfertas";
function App() {
	return (
		<main className='w-svw h-svh overflow-x-hidden bg-slate-100 flex'>
			<Navbar />
			<Aside />
			<main className='w-[80%] px-4 py-24'>
				{/* Secciones de ofertas con scroll  */}
				<section className='flex flex-col m-4 h-[52%]'>
					<h2 className='h-fit text-xl font-bold'>
						Ofertas Pendientes de Aprobacion
					</h2>
					<SecOfertas statusOfer='Pending' />
				</section>
				<section className='flex flex-col gap-2 m-4 h-[52%]'>
					<h2 className='h-fit text-xl font-bold'>
						Ofertas Pendientes de Aprobacion
					</h2>
					<SecOfertas statusOfer='Active' />
				</section>
			</main>
		</main>
	);
}

export default App;
