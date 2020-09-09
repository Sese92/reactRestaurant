import { GET_PLATES_SUCCESS } from '../../types';


export default (state, action) => {
    switch (action.type) {
        case GET_PLATES_SUCCESS: 
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state;
    }
}