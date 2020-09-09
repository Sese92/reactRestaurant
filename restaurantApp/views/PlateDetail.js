import React, { useContext } from 'react';
import { Image } from 'react-native'
import OrdersContext from '../context/orders/ordersContext';
import { Container, Content, Footer, FooterTab, Button, Body, Text, H1, Card, CardItem } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const PlateDetail = () => {
    const { plate } = useContext(OrdersContext);
    const { name, image, description, price } = plate;

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>{name}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.image} source={{ uri: image }} />
                            <Text style={{ marginTop: 20 }}>{description}</Text>
                            <Text style={globalStyles.quantity}>Price: {price}€</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={globalStyles.button} onPress={() => navigation.navigate('PlateForm')}>
                        <Text style={globalStyles.buttonText}>Order plate</Text>
                    </Button>

                </FooterTab>
            </Footer>
        </Container>
    );
}

export default PlateDetail;