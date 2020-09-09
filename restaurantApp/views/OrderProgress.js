import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, H1, H3, Button } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import OrdersContext from '../context/orders/ordersContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const OrderProgress = () => {
    const { orderId } = useContext(OrdersContext)

    const [time, saveTime] = useState(0)
    const [completed, saveCompleted] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection('orders')
                .doc(orderId)
                .onSnapshot(function (doc) {
                    saveTime(doc.data().deliveryTime)
                    saveCompleted(doc.data().completed)
                })
        }
        getProducts()
    }, [])


    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={styles.time}>{minutes}:{seconds}</Text>
        )
    }

    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, { marginTop: 50 }]}>
                {time === 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>We have received your order..</Text>
                        <Text style={{ textAlign: 'center' }}>We are calculating the delivery time</Text>
                    </>
                )}
                {!completed && time > 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Your order will be ready in</Text>
                        <Text>
                            <Countdown
                                date={Date.now() + time * 60000}
                                renderer={renderer}
                            />
                        </Text>

                    </>
                )}

                {completed && (
                    <>
                        <H1 style={styles.completedText}>Order ready</H1>
                        <H3 style={styles.completedText}>You can come to pickup your order when you want</H3>

                        <Button style={[globalStyles.button, {marginTop: 100}]}
                            rounded
                            block
                            onPress={() => navigation.navigate('NewOrder')}
                        >
                            <Text style={globalStyles.buttonText}>Start a new order</Text>
                        </Button>
                    </>
                )}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    time: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    },
    completedText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default OrderProgress;