import { UserIcon } from "../../assets/icons/UserIcon";
import { UserStore } from "../../Stores/userStore";
import { Link, useLocation } from "react-router-dom";
export function Navbar() {
	const { userLogged } = UserStore();
	const { pathname } = useLocation(); // Obtén el pathname de la ubicación actual
	const pathSegments = pathname.split("/"); // Divide el pathname en segmentos
	const lastSegment = pathSegments[pathSegments.length - 1]; // Obtiene el último segmento del path;
	return (
		<nav className='bg-blue-800 p-4 w-full max-h-16'>
			<div className='container mx-auto flex justify-between items-center'>
				{/* Left Section */}
				<div className='flex items-center space-x-4'>
					<div className='flex items-center'>
						{/* <img
							src='/path/to/your/image.jpg'
							alt='Logo'
							className='h-8 w-8 rounded-full'
						/> */}
						<span className='text-white ml-2 hover:cursor-pointer '>
							{" "}
							<Link to={"/"}> RRHHapp</Link>
						</span>
					</div>
				</div>

				{/* Center Section */}
				<div className='text-white text-2xl'>
					{lastSegment ? lastSegment : " Ofertas de empleo"}
				</div>

				{/* Right Section */}
				<div className='flex items-center space-x-4'>
					<span className='text-white'>
						{userLogged.userName ? userLogged.userName : "Username"}
					</span>
					{/* <img
						src='/path/to/your/user-image.jpg'
						alt='User'
						className='h-8 w-8 rounded-full'
					/> */}

					<div className='border-2 rounded-full border-gray-300 p-2 bg-slate-600 mb-1'>
						<UserIcon className={"text-gray-200 size-6"} />
					</div>
				</div>
			</div>
		</nav>
	);
}
