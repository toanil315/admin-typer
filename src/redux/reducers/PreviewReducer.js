import { CHANGE_PREVIEW_POST, HIDE_PREVIEW, SHOW_PREVIEW } from "../types/PreviewType";

const stateDefault = {
    visible: false,
    postPreview: {}
}

const PreviewReducer = (state=stateDefault, action) => {
    switch (action.type) {
        case SHOW_PREVIEW: {
            return {...state, visible: true}
        }

        case HIDE_PREVIEW: {
            return {...state, visible: false}
        }

        case CHANGE_PREVIEW_POST: {
            return {...state, postPreview: action.payload.postPreview}
        }
    
        default:
            return state;
    }
}

export default PreviewReducer