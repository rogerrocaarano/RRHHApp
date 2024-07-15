import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/CommonComponents/Navbar.1";
import { registerUser } from "../Services/UserService";
// PopUp de exito o error
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//iconos
import { EyeClose } from "../assets/icons/EyeClose";
import { EyeOpen } from "../assets/icons/EyeOpen";
export function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate(); // herramienta para redirigir a otra vista
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch /* setValue  lo utilizo para cargar file*/,
	} = useForm();

	console.log(errors);

	const onSubmit = handleSubmit(async (data) => {
		console.log(data);
		try {
			const wasSucces = await registerUser({
				email: data.email,
				password: data.password,
			}); // funcion que ejecuta el post a register
			wasSucces == "succes" &&
				toast.success(
					"Para terminar tu registro debes dar conformidad desde el email que enviamos a tu correo"
				);
			navigate("/login");
		} catch (error) {
			toast.error(
				"Tuvimos problemas al intentar registrate, por favor vuelve a intentar mas tarde"
			);
		}
	});

	return (
		<>
			<Navbar />
			<div className='w-full h-screen flex justify-center items-center'>
				<form
					className=' bg-zinc-100 flex flex-col gap-4 h-fit overflow-y-scroll p-6 w-[50%] rounded-xl'
					onSubmit={onSubmit}
				>
					{/*Correo*/}
					<div className='w-full flex justify-around gap-2'>
						<label
							className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
							htmlFor='email'
						>
							{" "}
							Correo{" "}
						</label>

						<input
							className='w-2/3 rounded-xl pl-4'
							type='email'
							{...register("email", {
								required: {
									value: true,
									message: "Correo no válido",
								},
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "El correo no es válido",
								},
							})}
						></input>

						{errors.Correo && (
							<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
								{" "}
								{errors.Correo.message}
							</span>
						)}
					</div>

					{/*Pasword*/}
					<div className='w-full flex justify-around gap-2'>
						<label
							className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
							htmlFor='password'
						>
							Password
						</label>
						<div className='relative w-2/3'>
							<input
								className='w-full rounded-xl pl-4 pr-10 '
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: {
										value: true,
										message: "Password es requerido",
									},
									minLength: {
										value: 6,
										message: "La contraseña debe tener al menos 6 caracteres",
									},
									pattern: {
										value:
											/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
										message:
											"La contraseña debe tener al menos una mayúscula, un número y un carácter especial",
									},
								})}
							></input>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeClose /> : <EyeOpen />}
							</button>
						</div>
						{errors.password && (
							<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
								{/* {" "} */}
								{errors.password.message}
							</span>
						)}
					</div>

					{/*Confirmar Password*/}
					<div className='w-full flex justify-around items-center gap-2'>
						<label
							className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
							htmlFor='confirmarPassword'
						>
							Confirmar Password
						</label>
						<div className='relative w-2/3'>
							<input
								className='w-full rounded-xl pl-4 pr-10 '
								type={showPassword ? "text" : "password"}
								{...register("ConfirmarPassword", {
									required: {
										value: true,
										message: "Confirmar password es requerido",
									},
									validate: (value) => {
										if (value === watch("password")) {
											return true;
										} else {
											return "Los parametros no coinciden";
										}
									},
								})}
							></input>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeClose /> : <EyeOpen />}
							</button>
						</div>
						{errors.ConfirmarPassword && (
							<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
								Confirmar password es requerido.
							</span>
						)}
					</div>

					{/*Feecha*/}
					{/* 
					<label
						className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
						htmlFor='fechaNacimiento'
					>
						Fecha de nacimiento
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='date'
						{...register("fechaNacimiento", {
							required: {
								value: true,
								message: "Fecha de nacimietno es requerida",
							},
							validate: (value) => {
								const fechaNacimiento = new Date(value);
								const fechaActual = new Date();
								const edad =
									fechaActual.getFullYear() - fechaNacimiento.getFullYear();
								return (edad = 18 || "Debe ser mayor de edad");
							},
						})}
					></input>
					{errors.fechaNacimiento && (
						<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
							{"Debe ser mayor de edad "}
							{errors.fechaNacimiento.message}
						</span>
					)} */}

					{/**/}
					<button className='bg-blue-500 text-white p-2 rounded-xl'>
						Registrarme
					</button>
				</form>
			</div>
		</>
	);
}
