import React, { useContext, useEffect } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab } from 'native-base';
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global';
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase'

const OrderSummary = () => {
    const navigation = useNavigation()

    const { order, total, showSummary, removeItem, orderOrdered } = useContext(OrdersContext)

    useEffect(() => {
        calculateTotal()
    }, [order])

    const calculateTotal = () => {
        let newTotal = 0;
        newTotal = order.reduce((newTotal, plate) => newTotal + plate.total, 0)
        showSummary(newTotal)
    }

    // Redirecciona a progreso del pedido
    const orderProgress = () => {
        Alert.alert(
            'Check your order',
            'Once you have confirmed it, it can`t be changed',
            [
                {
                    text: 'Confirm',
                    onPress: async () => {
                        const orderObject = {
                            deliveryTime: 0,
                            completed: false,
                            total: Number(total),
                            order: order,
                            created: Date.now(),
                            completedDate: null
                        }

                        try {
                            const order = await firebase.db.collection('orders').add(orderObject)
                            orderOrdered(order.id)

                            navigation.navigate('OrderProgress')
                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                { text: 'Review', style: 'cancel' }
            ]
        )
    }

    confirmRemove = id => {
        Alert.alert(
            'Do you want to remove this item?',
            'Once you have confirmed it, it can`t be recovered',
            [
                {
                    text: 'Confirm',
                    onPress: () => {
                        // Eliminar del state
                        removeItem(id)
                    }
                },
                { text: 'Cancel', style: 'cancel' }
            ]
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>Order summary</H1>
                {order.map((plate, i) => {
                    const { quantity, name, image, id, price } = plate;
                    return (
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large source={{ uri: image }} />
                                </Left>
                                <Body>
                                    <Text>{name}</Text>
                                    <Text>Quantity: {quantity}</Text>
                                    <Text>Price: {price}€</Text>

                                    <Button
                                        onPress={() => confirmRemove(id)}
                                        full
                                        danger
                                        style={{ marginTop: 20 }}
                                    >
                                        <Text style={[globalStyles.buttonText, { color: 'white' }]}>Remove</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.quantity}>Total to pay: {total}€</Text>

                <Button
                    onPress={() => navigation.navigate('Menu')}
                    style={{ marginTop: 30 }}
                    full
                    dark
                >
                    <Text style={[globalStyles.buttonText, { color: 'white' }]}>Continue with the order</Text>
                </Button>
            </Content>

            {order.length > 0 && (
                <Footer>
                    <FooterTab>
                        <Button
                            onPress={() => orderProgress()}
                            style={[globalStyles.button, { marginTop: 30 }]}
                            full
                        >
                            <Text style={globalStyles.buttonText}>Confirm the order</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )}

        </Container>
    );
}

export default OrderSummary;