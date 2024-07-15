/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
//Store
import { useJobOfferStore } from "../../Stores/JobOfferStore";
import { UserStore } from "../../Stores/userStore";
//hooks

//icons
import { CloseIcon } from "../../assets/icons/CloseIcon";
// PopUp de exito o error
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */
export function OfertForm({ toggleJobFormModal, selectOffer }) {
	const { userLogged } = UserStore();
	//Guarda el valor del dia de creacion para setearlo en el formulario como valor default
	const currentDate = new Date().toISOString().split("T")[0];
	//accede a las funciones del Hook de manejo de Ofertas
	const { createNewOffer, removeSelectOffer, editOffer, publishJobOffer } =
		useJobOfferStore();
	//Seteo del Hook-Form -> manejador del formulario

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty }, // Desestructuramos 'formState' una sola vez
	} = useForm({
		defaultValues: {
			budget: selectOffer && selectOffer.budget,
			displayBudget: selectOffer && selectOffer.displayBudget,
			description: selectOffer && selectOffer.description,
			expirationDate:
				selectOffer.expirationDate && selectOffer.expirationDate.split("T")[0],
			title: selectOffer && selectOffer.title,
			publishedDate: selectOffer ? selectOffer.publishedDate : currentDate,
		},
	});

	// Observa el valor de la fecha de publicación para no poder usar fechas anteriores
	const publishedDate = watch("publishedDate");

	const onSubmitNewOferr = async (newData) => {
		let wasSucces;
		!selectOffer.id
			? (wasSucces = await createNewOffer(newData))
			: (wasSucces = await editOffer(newData));
		// Poner nueva función del hook

		wasSucces == "succes"
			? toast.success("La oferta fue cargada con éxito")
			: toast.error(
					"Tuvimos problemas crear tu oferta, vuelve a intentar mas tarde por favor"
			  );
		reset();
		toggleJobFormModal(); // Cierra el formulario
		removeSelectOffer();
	};

	const aproveOfertFunction = async () => {
		const response = await publishJobOffer(selectOffer.id);
		response == "succes"
			? toast.success("La oferta fue publicada con éxito")
			: toast.error(
					"Tuvimos problemas publicar la oferta, vuelve a intentar mas tarde por favor"
			  );
		reset();
		toggleJobFormModal(); // Cierra el formulario
		removeSelectOffer();
	};
	const closeModal = () => {
		selectOffer.title && removeSelectOffer();
		toggleJobFormModal();
	};

	const apply = async () => {
		//await applyToOffer(userLogged.id, selectOffer.id)
		console.log("estas aplicando");
		//Sumar la funcion que llama todas las ofertas de nuevo.
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
					<div className='-mt-10' onClick={closeModal}>
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
						disabled={userLogged.userName === "candidate" ? true : false}
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
					disabled={userLogged.userName === "candidate" ? true : false}
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
						disabled={userLogged.userName === "candidate" ? true : false}
						{...register("expirationDate", {
							required: {
								value: true,
								message: "Debes completar el campo",
							},

							// validate: (value) =>
							// 	value > publishedDate ||
							// 	"La fecha de expiración no puede ser anterior o igual a la fecha de publicación",
						})}
					/>
				</div>
				{errors.expirationDate && (
					<span className='pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900'>
						{errors.expirationDate.message}
					</span>
				)}

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
						disabled={userLogged.userName === "candidate" ? true : false}
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
						disabled={userLogged.userName === "candidate" ? true : false}
						{...register("displayBudget")}
					/>
				</div>

				{/* Hay que trabajar la lista de requerimientos y la lista de personas que han aplicado... aunque esta ultima no tienen tanto que ver en el formulario */}

				{/* Revisiones - Solo disponible para utilizar quien tenga credenciales de aprobacion, y que sea visual en editar para el reclutador */}
				{userLogged.userName !== "candidate" && (
					<>
						<label htmlFor='Revision' className='-mb-4'>
							{" "}
							Revisiones{" "}
						</label>
						<textarea
							type='text'
							className='rounded-xl px-6 py-1'
							disabled={userLogged.userName === "recrutier" ? true : false}
						/>
					</>
				)}
				<div className='w-full flex justify-around p-2 m-4'>
					{/* Guardar/editar -> para quien la crea -> Enviar Revision/Aceptar para quien tenga permisos */}
					{userLogged.userName !== "candidate" ? (
						<button
							type='submit'
							className={`w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-green-500 bg-green-200/80 text-green-700 hover:border-green-200 hover:text-green-200 hover:bg-green-600 hover:cursor-pointer  ${
								isDirty && "border-green-900 text-gray-500"
							}`}
							// disabled={!isDirty} REVISAR
						>
							{!selectOffer.id
								? "Guardar"
								: userLogged.userName === "recrutier"
								? "Editar"
								: "Hacer Revisión"}
						</button>
					) : (
						//Si el usuario es el candidato en el form solo puede aplicar
						<button
							className={`w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-green-500 bg-green-200/80 text-green-700 hover:border-green-200 hover:text-green-200 hover:bg-green-600 hover:cursor-pointer `}
							onClick={apply}
						>
							Aplicar
						</button>
					)}
					{userLogged.userName !== "candidate" && (
						<button
							className='w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-red-500 bg-red-200/80 text-red-700 hover:border-red-200 hover:text-red-200 hover:bg-red-600 hover:cursor-pointer'
							onClick={() => reset()}
						>
							Resetear
						</button>
					)}
					{userLogged.userName === "director" && selectOffer.title && (
						<button
							className='w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-green-900 bg-green-500 text-white hover:font-extrabold hover:bg-green-100 hover:border-green-500  hover:text-green-500 '
							// onClick={() => aproveOfertFunction}
						>
							Publicar oferta
						</button>
					)}
				</div>
			</form>
		</main>
	);
}
