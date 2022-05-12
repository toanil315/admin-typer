import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import DrawerReducer from "./reducers/DrawerReducer";

const rootReducer = combineReducers({
    DrawerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))