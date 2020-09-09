import { SELECT_PLATE, CONFIRM_PLATE_ORDER, SHOW_SUMMARY, REMOVE_ITEM, ORDER_ORDERED } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SELECT_PLATE:
            return {
                ...state,
                plate: action.payload
            }
        case CONFIRM_PLATE_ORDER:
            return{
                ...state,
                order: [...state.order, action.payload]
            }
        case SHOW_SUMMARY:
            return{
                ...state,
                total: action.payload
            }
        case REMOVE_ITEM:
            return{
                ...state,
                order: state.order.filter(item => item.id !== action.payload)
            }
        case ORDER_ORDERED:{
            return{
                ...state,
                order: [],
                total: 0,
                orderId: action.payload
            }
        }
        default:
            return state;
    }
}