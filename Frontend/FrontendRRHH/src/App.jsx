import { Aside } from "./Components/CommonComponents/Aside";
import { Navbar } from "./Components/CommonComponents/Navbar.1";
import { OfertView } from "./Components/OfertaDeEmpleo/Index";
function App() {
	return (
		<main className='w-screen h-screen overflow-x-hidden bg-slate-100 flex flex-col'>
			<Navbar />
			<main className='flex h-full'>
				<Aside />
				<OfertView />
			</main>
		</main>
	);
}

export default App;
