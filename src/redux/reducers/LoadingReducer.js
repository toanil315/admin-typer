import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

const stateDefault = {
	isLoading: true
}

const LoadingReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case HIDE_LOADING: {
			return { ...state, isLoading: false }
		}

		case SHOW_LOADING: {
			return { ...state, isLoading: true }
		}

		default: return state;

	}
}

export default LoadingReducer;