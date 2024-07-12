/* eslint-disable react/prop-types */
export function GreenButton({ buttonContent }) {
	return (
		<button className='border-2 shadow-lg h-full rounded-xl border-green-600 text-green-500 text-sm hover:bg-green-200 hover:text-green-800 hover:cursor-pointer hover:font-semibold transition-all duration-300 py-1 px-4 '>
			{buttonContent}
		</button>
	);
}
