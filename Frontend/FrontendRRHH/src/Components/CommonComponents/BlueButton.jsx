/* eslint-disable react/prop-types */
export function BlueButton({ buttonContent }) {
	return (
		<button className='border-2 shadow-lg h-full rounded-xl border-blue-600 text-blue-500 text-sm hover:bg-blue-200 hover:text-blue-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
			{buttonContent}
		</button>
	);
}
