import { NavLink } from "react-router-dom";
import { UserStore } from "../../Stores/userStore";

export function Aside() {
	const { userLogged, logoutStore } = UserStore();

	return (
		<aside className='w-[20%] h-full flex flex-col justify-around items-center  bg-blue-600 rounded-xl border-4 border-zinc-400 '>
			<NavLink
				to={"/profile"}
				className={({ isActive }) =>
					isActive
						? "text-white  border-b-2 border-zinc-200 "
						: "hover:text-xl border-b-2 border-transparent "
				}
			>
				<span className='w-full flex justify-center text-zinc-300 text-lg hover:text-xl  hover:text-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					Perfil
				</span>
			</NavLink>

			<ul className='h-10/12 w-10/12 flex flex-col justify-center items-start gap-10 text-lg font-bold text-zinc-300'>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					<NavLink
						to={"/offerView"}
						className={({ isActive }) =>
							isActive
								? "text-white  border-b-2 border-zinc-200 "
								: "hover:text-xl border-b-2 border-transparent "
						}
					>
						{userLogged.roles.length > 1
							? "Ofertas de empleo"
							: "Oferta de empleo"}
					</NavLink>
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					{userLogged.roles.length > 1 && "Mis "}
					Postulaciones
				</li>
				<li className='hover:text-xl border-b-2 border-transparent hover:text-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:cursor-pointer'>
					{userLogged.roles.length > 1 && "Mis "}
					Procesos
				</li>

				{userLogged.roles.some((role) => role.name === "Admin") && (
					<li className='hover:text-xl border-b-2 border-transparent  '>
						<NavLink
							to={"/usersList"}
							className={({ isActive }) =>
								isActive
									? "text-white  border-b-2 border-zinc-200 "
									: "hover:text-xl border-b-2 border-transparent "
							}
						>
							See Users List
						</NavLink>
					</li>
				)}
			</ul>
			<div className='w-full flex justify-center text-zinc-300 text-lg'>
				{userLogged.user.userName ? (
					<NavLink to={"/"}>
						<span
							className='hover:text-xl hover:text-zinc-700 transition-all duration-300 hover:cursor-pointer'
							onClick={logoutStore}
						>
							Logout{" "}
						</span>
					</NavLink>
				) : (
					<span className='hover:text-xl hover:text-zinc-200 transition-all duration-300 hover:cursor-pointer'>
						<NavLink to={"/"}>Login</NavLink>
					</span>
				)}
			</div>
		</aside>
	);
}
