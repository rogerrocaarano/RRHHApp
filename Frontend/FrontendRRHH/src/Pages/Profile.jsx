import { UserStore } from "../Stores/userStore";

export function Profile() {
	const { userLogged } = UserStore();
	console.log(userLogged);
	return (
		<section className='w-full flex flex-col justify-center items-center gap-8'>
			<h1 className='w-1/2 mx-auto h-fit font-extrabold text-2xl'>
				Usuario Logueado:
			</h1>
			<div className='flex gap-6 text-xl font-bol items-center  border-2 px-8 py-2 rounded-xl'>
				<span>Nombre del Usuario :</span>
				<span> {userLogged.user.userName}</span>
				<div className='rounded-xl p-2 border-2 border-blue-900 text-blue-900 bg-blue-400  hover:cursor-pointer   hover:bg-blue-900 hover:text-blue-200'>
					Actualizar Datos
				</div>
			</div>
			<div className='flex gap-6 text-xl font-bol items-center  border-2 px-8 py-2 rounded-xl'>
				<span>Correo electronico :</span>
				<span> {userLogged.user.email}</span>
				<div className='rounded-xl p-2 border-2 border-blue-900 text-blue-900 bg-blue-400  hover:cursor-pointer   hover:bg-blue-900 hover:text-blue-200'>
					Actualizar Datos
				</div>
			</div>
			<div className='flex gap-6 text-xl font-bol items-center border-2 px-8 py-2 rounded-xl'>
				<span>Rol del Usuario en la App :</span>
				<span>
					{" "}
					{userLogged.roles.lenght >= 1
						? userLogged.roles[1].name
						: userLogged.roles[0].name}
				</span>
				<div className='rounded-xl p-2 border-2 border-blue-900 text-blue-900 bg-blue-400  hover:cursor-pointer  hover:bg-blue-900 hover:text-blue-200'>
					Actualizar Datos
				</div>
			</div>
		</section>
	);
}
