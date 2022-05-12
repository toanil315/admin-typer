import { HIDE_DRAWER, SHOW_DRAWER } from "../types/DrawerType";

const stateDefault = {
    visible: false,
    title: "Default",
    post : null,
}

const DrawerReducer = (state=stateDefault, action) => {
    switch (action.type) {
        case SHOW_DRAWER: {
            return {...state, visible: true};
        }

        case HIDE_DRAWER: {
            return {...state, visible: false};
        }

        default:
           return state;
    }
}

export default DrawerReducer