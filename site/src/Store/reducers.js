import {combineReducers} from "redux"
import {firebaseReducer} from "react-redux-firebase"
import {firestoreReducer} from "redux-firestore"


const initialState = {
    searchTerm: '',
    searchStatus: 'ready'
}
const yikkalaReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.term }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    yikkala: yikkalaReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})
