import { pictureService } from "../../services/picture.service";
import { REMOVE_PICTURE, SET_FILTER_BY, SET_PICTURES } from "../reducers/picture.reducer";

export function loadPictures() {
    return async (dispatch, getState) => {
        try {
            const pictures = await pictureService.getPictures(getState().pictureModule.filterBy)
            const action = {
                type: SET_PICTURES,
                pictures
            }

            dispatch(action);
        } catch (error) {
            
            console.log('Error:', error);
        }
    };
}

export function removePicture(pictureId) {
    return async (dispatch) => {
        try {
            await pictureService.deletePicture(pictureId);
            dispatch({ type: REMOVE_PICTURE, pictureId });
            return 'Removed!';
        } catch (error) {
            console.log('Error:', error);
        }
    };
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy });
    };
}
