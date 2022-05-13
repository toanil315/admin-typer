import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import DrawerReducer from "./reducers/DrawerReducer";
import PreviewReducer from "./reducers/PreviewReducer";

const rootReducer = combineReducers({
    DrawerReducer,
    PreviewReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))