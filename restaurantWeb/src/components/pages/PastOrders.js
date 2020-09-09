import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Order from '../ui/Order';

const PastOrders = () => {

    const { firebase } = useContext(FirebaseContext)

    const [orders, saveOrders] = useState([])

    const [totalCount, saveTotalCount] = useState([])

    useEffect(() => {
        const getOrders = () => {
            firebase.db.collection('orders').where('completed', '==', true).onSnapshot(manageSnapshot)
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

        let totalCount = 0
        orders.forEach(order => {
            if (formatDate(order.completedDate) === formatDate(new Date())) {
                totalCount += order.total
            }
        })
        saveTotalCount(totalCount)
    }

    function formatDate(datePassed) {
        let dateFormatted = ''
        let date = new Date(datePassed);
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getUTCFullYear()
        dateFormatted = day + "/" + month + "/" + year
        return dateFormatted
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Past orders</h1>
            <h2 className="mb-10">Today revenues: <span>{totalCount}€</span></h2>
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

export default PastOrders;