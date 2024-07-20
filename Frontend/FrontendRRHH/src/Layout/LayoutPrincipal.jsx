/* eslint-disable react/prop-types */
import { Aside } from "../Components/CommonComponents/Aside";
import { Navbar } from "../Components/CommonComponents/Navbar.1";

function LayoutPrincipal({ children }) {
	return (
		<main className='w-screen  bg-slate-100 flex flex-col'>
			<Navbar />
			<main
				className='flex overflow-hidden'
				style={{ height: "calc(100vh - 4rem)" }}
			>
				<Aside />
				{children}
			</main>
		</main>
	);
}

export default LayoutPrincipal;
