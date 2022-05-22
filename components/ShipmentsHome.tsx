import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipmentsList from './ShipmentsList';
import ShipmentDetails from './ShipmentDetails';

const Stack = createNativeStackNavigator();

export default function ShipmentsHome({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="Leveranser översikt">
            <Stack.Screen name="Leveranser översikt" component={ShipmentsList} />
            <Stack.Screen name="Skicka leverans" component={ShipmentDetails} />
        </Stack.Navigator>
    );
};