/* import React from 'react'; */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../Stores/userStore";
import { Navbar } from "../Components/CommonComponents/Navbar.1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//iconos
import { EyeClose } from "../assets/icons/EyeClose";
import { EyeOpen } from "../assets/icons/EyeOpen";
export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { loginUserRequest, userLogged } = UserStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	console.log("en el login, el userLoged es", userLogged);
	const onSubmit = async (data) => {
		// console.log("data al enviar formulario", data);
		try {
			const wasSucces = await loginUserRequest(data);
			wasSucces == "succes" && toast.success("Usuario Logeado con exito");
		} catch (error) {
			toast.error(
				"Tuvimos problemas al intentar Loegarte, por favor vuelve a intentar mas tarde"
			);
		} finally {
			navigate("/offerView");
		}
	};

	return (
		<>
			<Navbar />
			<div className='w-screen h-screen flex flex-col justify-center items-center border-2'>
				<form
					className='bg-zinc-100 flex flex-col gap-4 overflow-y-scroll p-6 w-[40%] h-fit rounded-xl'
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Correo electrónico */}
					<div className='flex justify-around gap-4'>
						<label
							className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
							htmlFor='email'
						>
							Correo electrónico
						</label>
						<input
							className='w-2/3 rounded-xl pl-4'
							type='text' //--------------CAMBIAR DESPUES A EMAIL
							{...register("email", {
								required: {
									value: true,
									message: "Correo electrónico es requerido",
								},
								// pattern: {
								// 	value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								// 	message: "Debes escribir un correo válido",
								// }, //-------------------------------------------HABILITAR
							})}
						/>
					</div>
					{errors.email && (
						<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
							{errors.email.message}
						</span>
					)}

					{/* Contraseña */}
					<div className='flex justify-around gap-4'>
						<label
							className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
							htmlFor='password'
						>
							Contraseña
						</label>
						<div className='relative w-2/3'>
							<input
								className='w-full rounded-xl pl-4 pr-10'
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: "Debes completar el campo",
									minLength: {
										value: 6,
										message: "La contraseña debe tener al menos 6 caracteres",
									},
									// pattern: {
									// 	value:
									// 		/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
									// 	message:
									// 		"La contraseña debe tener al menos una mayúscula, un número y un carácter especial",
									// },  //-------------------------------------------HABILITAR
								})}
							/>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeClose /> : <EyeOpen />}
							</button>
						</div>
					</div>
					{errors.password && (
						<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
							{errors.password.message}
						</span>
					)}

					<button
						type='submit'
						className='bg-blue-500 text-white p-2 rounded-xl'
					>
						Enviar
					</button>
				</form>
				<div className='h-24 flex justify-between items-center gap-4'>
					<span className='  '> ¿ No tiene cuenta ?</span>
					<button
						className=' hover:text-blue-500 hover:cursor-pointer '
						onClick={() => navigate("/register")}
					>
						Registrate aquí
					</button>
				</div>
			</div>
		</>
	);
}
