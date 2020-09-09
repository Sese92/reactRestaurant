import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import OrdersContext from '../context/orders/ordersContext';

const Menu = () => {

    const { menu, getPlates } = useContext(FirebaseContext)

    const { selectPlate } = useContext(OrdersContext)


    const navigation = useNavigation()

    useEffect(() => {
        getPlates();
    }, [])

    const showHeader = (category, i) => {
        if (i > 0) {
            const previousCategory = menu[i - 1].category;
            if (previousCategory != category) {
                return (
                    <Separator style={styles.separator}>
                        <Text style={styles.separatorText}>{category}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separator}>
                    <Text style={styles.separatorText}>{category}</Text>
                </Separator>
            )
        }
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {menu.map((plate, i) => {
                        const { image, name, description, price, category, id } = plate;
                        return (
                            <Fragment key={id}>
                                {showHeader(category, i)}
                                <ListItem
                                    onPress={ () => {
                                        selectPlate(plate)
                                        navigation.navigate('PlateDetail')
                                    }}
                                >
                                    <Thumbnail large source={{ uri: image }} />
                                    <Body>
                                        <Text>{name}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >{description}</Text>
                                        <Text>Price: {price}€</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#000'
    },
    separatorText: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default Menu;