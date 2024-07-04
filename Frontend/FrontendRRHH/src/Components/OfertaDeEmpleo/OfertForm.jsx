/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useJobOfferStore } from "../../Stores/JobOfferStore";
import { CloseIcon } from "../../assets/icons/CloseIcon";

/* eslint-disable react/prop-types */
export function OfertForm({ toggleFunction }) {
	//Guarda el valor del dia de creacion para setearlo en el formulario como valor default
	const currentDate = new Date().toISOString().split("T")[0];
	//accede a las funciones del Hook de manejo de Ofertas
	const { createNewOffer } = useJobOfferStore();

	//Seteo del Hook-Form -> manejador del formulario
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty }, // Desestructuramos 'formState' una sola vez
	} = useForm({
		defaultValues: {
			publishedDate: currentDate,
		},
	});

	// Observa el valor de la fecha de publicación para no poder usar fechas anteriores
	const publishedDate = watch("publishedDate");

	const onSubmitNewOferr = async (newData) => {
		console.log(newData);
		await createNewOffer(newData);
		// Poner nueva función del hook
		reset();
		toggleFunction(); // Cierra el formulario
	};

	return (
		<main className=' w-full h-full flex justify-center items-center'>
			<form
				className=' bg-zinc-100 z-20 flex flex-col gap-4 h-[90%] overflow-y-scroll p-6 w-[50%] ml-[10%] rounded-xl'
				onSubmit={handleSubmit(onSubmitNewOferr)}
			>
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-bold flex justify-center mb-6'>
						Crear Oferta{" "}
					</h2>
					<div className='-mt-10' onClick={toggleFunction}>
						<CloseIcon
							className={
								"text-blue-500 hover:cursor-pointer hover:text-blue-700"
							}
						/>
					</div>
				</div>
				{/* title */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
						htmlFor='title'
					>
						{" "}
						Titulo{" "}
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='text'
						{...register("title", {
							required: {
								value: true,
								message: "Debes completar el campo",
							},
							minLength: {
								value: 6,
								message: "El titulo debe tener al menos 6 Caracteres",
							},
						})}
					/>
				</div>
				{errors.title && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.title.message}
					</span>
				)}

				{/* descripcion */}
				<label className='-mb-4' htmlFor='description'>
					{" "}
					Descripción{" "}
				</label>
				<textarea
					type='text'
					className='rounded-xl px-6 py-1'
					{...register("description", {
						required: {
							value: true,
							message: "Debes completar el campo",
						},
						minLength: {
							value: 16,
							message: "El titulo debe tener al menos 16 Caracteres",
						},
					})}
				/>
				{errors.description && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.description.message}
					</span>
				)}

				{/* Fecha de Publicacion  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='publishedDate'
					>
						{" "}
						Fecha de Publicación{" "}
					</label>
					<input
						className='w-2/3 rounded-xl  pl-36'
						type='date'
						{...register("publishedDate")}
						disabled
					/>
				</div>

				{/* Fecha de Expiración  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='expirationDate'
					>
						{" "}
						Fecha de Expiración{" "}
					</label>
					<input
						className='w-2/3 rounded-xl flex pl-36'
						type='date'
						{...register("expirationDate", {
							required: {
								value: true,
								message: "Debes completar el campo",
							},

							validate: (value) =>
								value > publishedDate ||
								"La fecha de expiración no puede ser anterior o igual a la fecha de publicación",
						})}
					/>
				</div>
				{errors.expirationDate && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.expirationDate.message}
					</span>
				)}
				{/* Fecha de Edicion - Solo cunado se edite  */}
				{/* HABILITAR CUANDO SE CREE LA POSIBILIDAD DE EDITAR
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='LastUpdatedDate'
					>
						{" "}
						Fecha de Edicion{" "}
					</label>
					<input
						className='w-2/3 rounded-xl flex pl-36'
						type='date'
						{...register("LastUpdatedDate", {
							validate: (value) =>
								!value ||
								value >= publishedDate ||
								"La fecha de edición no puede ser anterior o igual a la fecha de publicación",
						})}
					/>
				</div>
				{errors.LastUpdatedDate && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.LastUpdatedDate.message}
					</span>
				)} */}

				{/* Presupuesto - solo recibe numeros*/}

				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='budget'
					>
						{" "}
						Presupuesto{" "}
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='text'
						{...register("budget", {
							required: {
								value: true,
								message: "Debe completar el campo",
							},
							pattern: {
								value: /^\d+$/,
								message: "Solo se permiten números",
							},
						})}
					/>
				</div>
				{errors.budget && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.budget.message}
					</span>
				)}

				{/*Display Presupuesto - solo recibe numeros*/}
				<div className='flex justify-start gap-4'>
					<label
						className='w-fit text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='displayBudget'
					>
						{" "}
						Hacer visible el Presupuesto{" "}
					</label>
					<input
						className='size-6 my-auto rounded-xl'
						type='checkbox'
						{...register("displayBudget")}
					/>
				</div>

				{/* Estado de la Oferta - Ver si hace falta utilizar en algun caso*/}
				{/* <div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='Status'
					>
						{" "}
						Estado de la Oferta{" "}
					</label>
					<select
						className='w-2/3 rounded-xl pl-6'
						type='text'
						{...register("Status")}
					>
						<option value='Pending approval'>Pendiente</option>
						<option value='InRevision'>En Revisión</option>
						<option value='Approval'>Activa</option>
						<option value='Close'>Cerrada</option>
					</select>
				</div> */}

				{/* Hay que trabajar la lista de requerimientos y la lista de personas que han aplicado... aunque esta ultima no tienen tanto que ver en el formulario */}

				{/* Revisiones - Solo disponible para utilizar quien tenga credenciales de aprobacion, y que sea visual en editar para el reclutador */}
				{/* <label htmlFor='Revision' className='-mb-4'>
					{" "}
					Revisiones{" "}
				</label>
				<textarea type='text' className='rounded-xl px-6 py-1' /> */}
				<div className='w-full flex justify-around p-2 m-4'>
					{/* Guardar/editar -> para quien la crea -> Enviar Revision/Aceptar para quien tenga permisos */}
					<button
						type='submit'
						className={`w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-green-500 bg-green-200/80 text-green-700 hover:border-green-200 hover:text-green-200 hover:bg-green-600 hover:cursor-pointer  ${
							isDirty && "border-green-900 text-gray-500"
						}`}
						// disabled={!isDirty} REVISAR
					>
						Guardar
					</button>
					<button
						className='w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-red-500 bg-red-200/80 text-red-700 hover:border-red-200 hover:text-red-200 hover:bg-red-600 hover:cursor-pointer'
						onClick={() => reset()}
					>
						Resetear
					</button>
				</div>
			</form>
		</main>
	);
}
