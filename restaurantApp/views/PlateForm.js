import React, { useContext, useState, useEffect } from 'react';
import { Container, Content, Form, Icon, Input, Grid, Col, Button, Text, Footer, FooterTab } from 'native-base';
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global';
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const PlateForm = () => {
    const navigation = useNavigation()

    const [quantity, saveQuantity] = useState(1)
    const [total, saveTotal] = useState(0)

    const { plate, saveOrder } = useContext(OrdersContext);
    const { price, name } = plate;

    useEffect(() => {
        calculateTotal();
    }, [quantity])

    const calculateTotal = () => {
        const totalQuantity = price * quantity;
        saveTotal(totalQuantity)
    }

    const removeOne = () => {
        if (quantity > 1) {
            const newQuantity = parseInt(quantity) - 1;
            saveQuantity(newQuantity)
        }
    }

    const addOne = () => {
        const newQuantity = parseInt(quantity) + 1;
        saveQuantity(newQuantity)
    }

    const confirmOrder = () => {
        Alert.alert(
            'Do you want to add ' + quantity.toString() + ' ' + name + ' to your order?',
            '',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        // Añadir al pedido principal
                        const order = {
                            ...plate,
                            quantity,
                            total
                        }
                        saveOrder(order)

                        // Navega hacia el resumen
                        navigation.navigate('OrderSummary')
                    }
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <Form>
                    <Text style={globalStyles.title}>Quantity</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, alignSelf: 'center' }}
                                onPress={() => removeOne()}
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                style={{ textAlign: 'center', fontSize: 20 }}
                                value={quantity.toString()}
                                keyboardType='numeric'
                                onChangeText={quantity => saveQuantity(quantity)}
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, alignSelf: 'center' }}
                                onPress={() => addOne()}
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.quantity}>Subtotal: {total}€</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={globalStyles.button} onPress={() => confirmOrder()}>
                        <Text style={globalStyles.buttonText}>Add to your order</Text>
                    </Button>

                </FooterTab>
            </Footer>
        </Container>
    );
}

export default PlateForm;