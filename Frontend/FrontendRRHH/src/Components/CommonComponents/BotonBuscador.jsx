/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export function BotonBuscador({ toggleFunction }) {
	return (
		<div className='  bg-gray-100'>
			<button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
      onClick={() => toggleFunction()}
      >
				Creacion de empleo
			</button>
		</div>
	);
}
