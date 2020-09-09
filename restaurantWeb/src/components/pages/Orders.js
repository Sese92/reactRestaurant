import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Order from '../ui/Order';

const Orders = () => {

    const { firebase } = useContext(FirebaseContext)

    const [orders, saveOrders] = useState([])

    useEffect(() => {
        const getOrders = () => {
            firebase.db.collection('orders').where('completed', '==', false).onSnapshot(manageSnapshot)
        }
        getOrders()
    }, [])

    function manageSnapshot(snapshot) {
        const orders = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        orders.sort(function (orderA, orderB) {
            return orderB.created - orderA.created
        })

        saveOrders(orders)
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Orders</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
                {orders.map(order => (
                    <Order
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>

        </>
    );
}

export default Orders;
