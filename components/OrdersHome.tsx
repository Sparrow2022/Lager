import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base, Typography } from '../styles';

import OrderList from './OrderList';
import OrderDetails from './OrderDetails';

const Stack = createNativeStackNavigator();

export default function OrdersHome(props) {
    return (
        <Stack.Navigator initialRouteName="Beställningar redo att plockas">
            <Stack.Screen name="Beställningar redo att plockas" component={OrderList} />
            <Stack.Screen name="Detaljer">
                {(screenProps) => <OrderDetails {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}