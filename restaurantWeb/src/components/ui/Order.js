import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase'

const Order = ({ order }) => {

    const [deliveryTime, saveDeliveryTime] = useState(0)

    const { firebase } = useContext(FirebaseContext);

    let dateFormatted = '';
    if (order.completedDate) {
        let date = new Date(order.completedDate);
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getUTCFullYear()
        let hour = date.getHours()
        let minutes = date.getMinutes()

        dateFormatted = day + "/" + month + "/" + year + ' ' + hour + ':' + minutes
    }
    const setTime = id => {
        try {
            firebase.db.collection('orders')
                .doc(id)
                .update({
                    deliveryTime
                })
        } catch (error) {
            console.log(error)
        }
    }

    const completeOrder = id => {
        try {
            firebase.db.collection('orders')
                .doc(id)
                .update({
                    completed: true,
                    completedDate: Date.now()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 bg-white" style={{boxShadow: 'rgb(204 122 0 / 50%) 0px 0px 0px 2px'}}>
                <h1 className="text-yellow-600 text-lg font-bold">Order: {order.id}</h1>
                <h2>Plates:</h2>
                {order.order.map(plate => (
                    <p className="text-gray-600 ml-5">{plate.quantity} {plate.name}</p>
                ))}
                <p className="text-gray-700 font-bold" style={{textAlign: 'right'}}>{!order.completed ? 'Total to pay: ' : 'Total payed: '}{order.total}€</p>

                {order.completed && (
                    <p className="text-gray-700 font-bold">Delivery time: {dateFormatted}</p>
                )}

                {order.deliveryTime === 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Time to delivery
                        </label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            max="20"
                            placeholder="Time"
                            value={deliveryTime}
                            onChange={e => saveDeliveryTime(parseInt(e.target.value))}
                        />

                        <button
                            onClick={() => setTime(order.id)}
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Set time
                        </button>
                    </div>
                )}

                {order.deliveryTime > 0 && !order.completed && (
                    <p className="text-gray-700">Delivery time:
                        <span className="font-bold"> {order.deliveryTime} min</span>
                    </p>
                )}

                {!order.completed && order.deliveryTime > 0 && (
                    <button
                        type="button"
                        className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                        onClick={() => completeOrder(order.id)}
                    >
                        Ready
                    </button>
                )}
            </div>
        </div>
    );
}

export default Order;