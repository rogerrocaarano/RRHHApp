import { useForm } from "react-hook-form";
/* eslint-disable react/prop-types */
import { JobOffersHandler } from "../../hooks/jobOffersHandler";

export function OfertForm({ toggleFunction }) {
	const { createOfferHandler } = JobOffersHandler();
	const currentDate = new Date().toISOString().split("T")[0];
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
		formState: { isDirty },
	} = useForm({
		defaultValues: {
			PublishedDate: currentDate,
		},
	});

	//observa el valor de la fehca de publicacion para no poder usar fechas anteriores
	const publishedDate = watch("PublishedDate");

	const onSubmitNewOferr = async (newData) => {
		console.log(newData);
		createOfferHandler(newData);
		// poner neuva fn del hook
		reset();
		// toggleFunction() -> Cierra el formulario
	};

	return (
		<main className=' w-full h-screen flex justify-center items-center'>
			<form
				className=' bg-zinc-100 z-20 flex flex-col gap-4 h-[450px] overflow-y-scroll p-6 w-[50%] ml-[10%] rounded-xl'
				onSubmit={handleSubmit(onSubmitNewOferr)}
			>
				<h2 className='text-xl font-bold flex justify-center mb-6'>
					Crear Oferta{" "}
				</h2>
				{/* title */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base font-semibold border-b-2 border-zinc-900'
						htmlFor='Title'
					>
						{" "}
						Titulo{" "}
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='text'
						{...register("Title", {
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
				{errors.Title && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.Title.message}
					</span>
				)}

				{/* descripcion */}
				<label className='-mb-4' htmlFor='Description'>
					{" "}
					Descripción{" "}
				</label>
				<textarea
					type='text'
					className='rounded-xl px-6 py-1'
					{...register("Description", {
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
				{errors.Description && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.Description.message}
					</span>
				)}

				{/* Fecha de Publicacion  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='PublishedDate'
					>
						{" "}
						Fecha de Publicación{" "}
					</label>
					<input
						className='w-2/3 rounded-xl  pl-36'
						type='date'
						{...register("PublishedDate")}
						disabled
					/>
				</div>

				{/* Fecha de Expiración  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='ExpirationDate'
					>
						{" "}
						Fecha de Expiración{" "}
					</label>
					<input
						className='w-2/3 rounded-xl flex pl-36'
						type='date'
						{...register("ExpirationDate", {
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
				{errors.ExpirationDate && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.ExpirationDate.message}
					</span>
				)}
				{/* Fecha de Edicion - Solo cunado se edite  */}

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
				)}

				{/* Presupuesto - solo recibe numeros*/}

				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='Budget'
					>
						{" "}
						Presupuesto{" "}
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='text'
						{...register("Budget", {
							required: {
								value: true,
								message:
									"Debes completar el campo, aqui tienes un ejemplo: 890 Euros",
							},
							pattern: {
								value: /\d/,
								message: "Debe contener al menos un número",
							},
						})}
					/>
				</div>
				{errors.Budget && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.Budget.message}
					</span>
				)}

				{/*Display Presupuesto - solo recibe numeros*/}
				<div className='flex justify-start gap-4'>
					<label
						className='w-fit text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='DisplayBudget'
					>
						{" "}
						Hacer visible el Presupuesto{" "}
					</label>
					<input
						className='size-6 my-auto rounded-xl'
						type='checkbox'
						{...register("DisplayBudget")}
					/>
				</div>

				{/* Estado de la Oferta - deberia ser un select ?*/}
				<div className='flex justify-around gap-4'>
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
				</div>

				{/* Creada por  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='CreatedBy'
					>
						{" "}
						Creada por :{" "}
					</label>
					<input
						className='w-2/3 rounded-xl pl-4'
						type='text'
						{...register("CreatedBy", {
							required: {
								value: true,
								message: "Debes completar el campo",
							},
						})}
					/>
				</div>
				{errors.CreatedBy && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.CreatedBy.message}
					</span>
				)}
				{/* Aprovada por - solo disponible para quien tenga permismos de aprovacion */}
				{/* <div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='ApprovedBy'
					>
						{" "}
						Aprovada por :{" "}
					</label>
					<input
						className='w-2/3 rounded-xl'
						type='text'
						{...register("ApprovedBy", {
							required: {
								value: true,
								message: "Debes completar el campo",
							},
						})}
					/>
				</div> */}
				{errors.ApprovedBy && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.ApprovedBy.message}
					</span>
				)}

				{/* Hay que trabajar la lista de requerimientos y la lista de personas que han aplicado... aunque esta ultima no tienen tanto que ver en el formulario */}

				{/* Revisiones - Solo disponible para quien tenga credenciales de aprobacion */}
				<label htmlFor='Revision' className='-mb-4'>
					{" "}
					Revisiones{" "}
				</label>
				<textarea type='text' className='rounded-xl px-6 py-1' />
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
