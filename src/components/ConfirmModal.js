import React from 'react'

export default function ConfirmModal({ handleConfirm, title, visible, setVisible }) {

	return (
		visible && <div className="fixed z-20 top-0 left-0 w-screen h-screen">
			<div onClick={() => { setVisible(false) }} className='absolute z-30 top-0 left-0 w-full h-full bg-black bg-opacity-40'></div>
			<div className='absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 md:w-1/4 shadow-xl bg-white rounded-lg p-4'>
				<h2 className="text-xl font-semibold text-gray-600">{title}</h2>
				<div className="w-full flex justify-around mt-4">
					<button onClick={handleConfirm} class="py-1 px-8 font-semibold text-white bg-blue-400 shadow-blue-300 shadow-md hover:bg-blue-500 hover:shadow-sm transition-all duration-150 ease-out">OK</button>
					<button onClick={() => { setVisible(false) }} className="py-1 px-8 font-semibold text-gray-500">Cancel</button>
				</div>
			</div>
		</div>
	)
}
