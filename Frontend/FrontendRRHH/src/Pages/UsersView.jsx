//Vista solo para Admin
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//store
import { UserStore } from "../Stores/userStore";
export function UsersView() {
	const { loading, getAllUsers, allUsers, userLogged } = UserStore();
	const navigate = useNavigate();
	useEffect(() => {
		if (userLogged.roles.some((role) => role.name === "Admin")) {
			getAllUsers();
		} else {
			navigate("/");
		}
	}, [userLogged.userName, navigate, getAllUsers]);
	allUsers.length > 0 && console.log("buscando", allUsers[0].user.userName);
	return (
		<main className='w-full h-full flex flex-col justify-center items-center'>
			{loading && <h2> Requiriendo usuarios de la base de datos... </h2>}
			{allUsers.length > 0 && (
				<section className='w-10/12 h-10/12 flex flex-col gap-4'>
					<h3 className='text-2xl font-bold'>Users: </h3>
					<ul className=' flex flex-col gap-4'>
						{allUsers.map((item) => (
							<li
								key={item.user.id}
								className='pl-2 flex justify-between items-center bg-slate-300 rounded-xl'
							>
								<span className='text-zinc-800'>{item.user.email}</span>
								<span className='text-zinc-800'>
									{item.user.normalizedUserName.includes("@")
										? "CANDIDATE"
										: item.user.normalizedUserName}
								</span>
								<button className='rounded-xl p-2 bg-blue-500'>
									Change Rol
								</button>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	);
}
