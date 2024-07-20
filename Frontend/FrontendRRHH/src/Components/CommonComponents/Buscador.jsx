/* eslint-disable react/prop-types */
import { SearchIcon } from "../../assets/icons/SearchIcon";
export function Buscador() {
	return (
		<div className='flex gap-2 items-center justify-start '>
			<SearchIcon
				className={
					" size-10 text-blue-500 mb-1 border-2 p-2 rounded-full bg-gray-200"
				}
			/>
			<div className='flex flex-col  mt-4'>
				<input
					type='text'
					placeholder='Search...'
					className='w-96 p-2 mb-4 border border-gray-300 rounded'
				/>
				<div className='w-96 border border-gray-300 rounded max-h-40 overflow-y-auto'>
					{(item, index) => (
						<div
							key={index}
							className='p-2 border-b last:border-b-0 border-gray-200'
						>
							{item}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
