/* eslint-disable react/prop-types */
import { Aside } from "../Components/CommonComponents/Aside";
import { Navbar } from "../Components/CommonComponents/Navbar.1";

function LayoutPrincipal({ children }) {
	return (
		<main className='w-screen h-screen overflow-x-hidden bg-slate-100 flex flex-col'>
			<Navbar />
			<main className='flex h-full '>
				<Aside />
				{children}
			</main>
		</main>
	);
}

export default LayoutPrincipal;
