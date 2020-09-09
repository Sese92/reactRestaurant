import React, { useContext } from 'react';
import { Button, Text } from 'native-base';
import globalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native';
import OrdersContext from '../../context/orders/ordersContext';

const SummaryButton = () => {
    const navigation = useNavigation();

    const { order } = useContext(OrdersContext)

    if (order.length === 0) return null;
    
    return ( 
        <Button style={globalStyles.button} onPress={() => navigation.navigate('OrderSummary')}>
            <Text style={globalStyles.buttonText}>See order</Text>
        </Button>
     );
}
 
export default SummaryButton;