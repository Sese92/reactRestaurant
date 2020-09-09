import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import FirebaseState from './context/firebase/firebaseState'
import OrdersState from './context/orders/ordersState';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './views/Menu';
import NewOrder from './views/NewOrder';
import OrderProgress from './views/OrderProgress';
import OrderSummary from './views/OrderSummary';
import PlateDetail from './views/PlateDetail';
import PlateForm from './views/PlateForm';

import SummaryButton from './components/ui/SummaryButton';

const Stack = createStackNavigator();

const App = () => {
  return (
    <FirebaseState>
      <OrdersState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00'
              },
              headerTitleStyle: {
                fontWeight: 'bold'
              },
              headerTintColor: '#000'
            }}
          >
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{
                title: 'New Order'
              }}
            />

            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Menu',
                headerRight: props => <SummaryButton />
              }}
            />

            <Stack.Screen
              name="PlateDetail"
              component={PlateDetail}
              options={{
                title: 'Plate Detail'
              }}
            />

            <Stack.Screen
              name="PlateForm"
              component={PlateForm}
              options={{
                title: 'Plate order'
              }}
            />

            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{
                title: 'Order summary'
              }}
            />

            <Stack.Screen
              name="OrderProgress"
              component={OrderProgress}
              options={{
                title: 'Order progress'
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </OrdersState>
    </FirebaseState>
  );
};

const styles = StyleSheet.create({

});

export default App;
