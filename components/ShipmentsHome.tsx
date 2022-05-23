import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipmentsList from './ShipmentsList';
import ShipmentDetails from './ShipmentDetails';

const Stack = createNativeStackNavigator();

export default function ShipmentsHome({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="Ordrar redo att skickas">
            <Stack.Screen name="Ordrar redo att skickas" component={ShipmentsList} />
            <Stack.Screen name="Skicka leverans" component={ShipmentDetails} />
        </Stack.Navigator>
    );
};