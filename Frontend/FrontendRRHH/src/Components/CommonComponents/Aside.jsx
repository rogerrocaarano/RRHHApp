import { NavLink } from "react-router-dom";

export function Aside() {
	return (
		<aside className='w-[20%] h-full flex flex-col justify-center items-center  bg-blue-600 rounded-xl border-4 border-zinc-400 '>
			<ul className='h-10/12 w-10/12 flex flex-col justify-center items-start gap-10 text-lg font-bold text-zinc-300'>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					Perfil
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					<NavLink
						to={"/"}
						className={({ isActive }) =>
							isActive
								? "text-white "
								: "hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer"
						}
					>
						Oferta de empleo
					</NavLink>
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					Postulaciones
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					Procesos
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					Others
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					<NavLink to={"/login"}>Login</NavLink>
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					<NavLink to={"/register"}>Register</NavLink>
				</li>
			</ul>
		</aside>
	);
}
