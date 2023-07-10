import { pictureService } from "../../services/picture.service";
import { REMOVE_PICTURE, SET_FILTER_BY, SET_PICTURES, SET_CATEGORIES } from "../reducers/picture.reducer";

export function loadPictures() {
  return async (dispatch, getState) => {
    try {
      const pictures = await pictureService.getPictures(getState().pictureModule.filterBy);
      const action = {
        type: SET_PICTURES,
        pictures
      };

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
  console.log(filterBy)
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy });
  };
}

export function loadCategories() {
  return async (dispatch) => {
    try {
      const categories = await pictureService.getCategories();
      const action = {
        type: SET_CATEGORIES,
        categories
      };

      dispatch(action);
    } catch (error) {
      console.log('Error:', error);
    }
  };
}
