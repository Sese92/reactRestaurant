import React, { useReducer } from 'react';

import OrdersReducer from './ordersReducer';
import OrdersContext from './ordersContext';

import { SELECT_PLATE, CONFIRM_PLATE_ORDER, SHOW_SUMMARY, REMOVE_ITEM, ORDER_ORDERED } from '../../types';

const OrdersState = props => {
    // Crear state inicial
    const initialState = {
        order: [],
        plate: null,
        total: 0,
        orderId: ''
    }

    // useReducer para ejecutar las funciones
    const [state, dispatch] = useReducer(OrdersReducer, initialState);

    const selectPlate = plate => {
        dispatch({
            type: SELECT_PLATE,
            payload: plate
        })
    }

    // Cuando el usuario añade un plato
    const saveOrder = order => {
        dispatch({
            type: CONFIRM_PLATE_ORDER,
            payload: order
        })
    }

    const showSummary = total => {
        dispatch({
            type: SHOW_SUMMARY,
            payload: total
        })
    }

    const removeItem = id => {
        dispatch({
            type: REMOVE_ITEM,
            payload: id
        })
    }

    const orderOrdered = id => {
        dispatch({
            type: ORDER_ORDERED,
            payload: id
        })
    }


    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                plate: state.plate,
                total: state.total,
                orderId: state.orderId,
                selectPlate,
                saveOrder,
                showSummary,
                removeItem,
                orderOrdered
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState;