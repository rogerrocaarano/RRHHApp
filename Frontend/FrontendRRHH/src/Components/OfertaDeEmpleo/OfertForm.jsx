export function OfertForm() {
	return (
		<main className=' w-full h-screen flex justify-center items-center'>
			<form className=' bg-zinc-100 z-20 flex flex-col gap-4 h-[450px] overflow-y-scroll p-6 w-[50%] ml-[10%] rounded-xl'>
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
					<input className='w-2/3 rounded-xl pl-4' type='text' />
				</div>

				{/* descripcion */}
				<label className='-mb-4' htmlFor='Description'>
					{" "}
					Descripción{" "}
				</label>
				<textarea type='text' className='rounded-xl px-6 py-1' />

				{/* Fecha de Publicacion  */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='PublishedDate'
					>
						{" "}
						Fecha de Publicación{" "}
					</label>
					<input className='w-2/3 rounded-xl  pl-36' type='date' />
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
					<input className='w-2/3 rounded-xl flex pl-36' type='date' />
				</div>

				{/* Fecha de Edicion - Solo cunado se edite  */}

				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-1 mt-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='LastUpdatedDate'
					>
						{" "}
						Fecha de Edicion{" "}
					</label>
					<input className='w-2/3 rounded-xl flex pl-36' type='date' />
				</div>

				{/* Presupuesto - solo recibe numeros*/}

				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='Budget'
					>
						{" "}
						Presupuesto{" "}
					</label>
					<input className='w-2/3 rounded-xl' type='text' />
				</div>

				{/*Display Presupuesto - solo recibe numeros*/}
				<div className='flex justify-start gap-4'>
					<label
						className='w-fit text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='DisplayBudget'
					>
						{" "}
						Hacer visible el Presupuesto{" "}
					</label>
					<input className='size-6 my-auto rounded-xl' type='checkbox' />
				</div>
				<label htmlFor='DisplayBudget'> </label>
				<input type='' />

				{/* Estado de la Oferta - deberia ser un select ?*/}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='Status'
					>
						{" "}
						Estado de la Oferta{" "}
					</label>
					<input className='w-2/3 rounded-xl' type='text' />
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
					<input className='w-2/3 rounded-xl' type='text' />
				</div>
				{/* Aprovada por - solo disponible para quien tenga permismos de aprovacion */}
				<div className='flex justify-around gap-4'>
					<label
						className='w-1/3 text-base py-2 font-semibold border-b-2 border-zinc-900'
						htmlFor='ApprovedBy'
					>
						{" "}
						Aprovada por :{" "}
					</label>
					<input className='w-2/3 rounded-xl' type='text' />
				</div>

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
						className='w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-green-500 bg-green-200/80 text-green-700 hover:border-green-200 hover:text-green-200 hover:bg-green-600 hover:cursor-pointer'
					>
						Guardar
					</button>
					<button className='w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold border-red-500 bg-red-200/80 text-red-700 hover:border-red-200 hover:text-red-200 hover:bg-red-600 hover:cursor-pointer'>
						Resetear
					</button>
				</div>
			</form>
		</main>
	);
}
