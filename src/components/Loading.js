import React from 'react'
import { useSelector } from 'react-redux'
import loadingGif from '../assets/img/loading.jpg'

export default function Loading() {
	const { isLoading } = useSelector(state => state.LoadingReducer)
	return (
		isLoading && <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-40">
			<img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 z-50" src={loadingGif} alt="loading" />
		</div>
	)
}
