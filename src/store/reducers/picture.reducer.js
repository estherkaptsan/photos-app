
export const SET_PICTURES = 'SET_PICTURES'
export const ADD_PICTURE = 'ADD_PICTURE'
export const REMOVE_PICTURE = 'REMOVE_PICTURE'
export const UPDATE_PICTURE = 'UPDATE_PICTURE'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_CATEGORIES = 'SET_CATEGORIES'

const INITIAL_STATE = {

    pictures: [],
    categories: [],
    filterBy: {
        category: '',
    }
};

export function pictureReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_PICTURES:
            return {
                ...state,
                pictures: action.pictures
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case ADD_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, action.picture]
            }
        case REMOVE_PICTURE:
            return {
                ...state,
                pictures: state.pictures.filter(picture => picture._id !== action.pictureId)
            }
        case UPDATE_PICTURE:
            return {
                ...state,
                pictures: state.pictures.map(picture => picture._id === action.picture._id ? action.picture : picture)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }

            }

        default:
            return state;
    }
}