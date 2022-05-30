import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import DrawerReducer from "./reducers/DrawerReducer";
import PreviewReducer from "./reducers/PreviewReducer";
import UserReducer from "./reducers/UserReducer";
import LoadingReducer from "./reducers/LoadingReducer";

const rootReducer = combineReducers({
    DrawerReducer,
    PreviewReducer,
    UserReducer,
    LoadingReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))