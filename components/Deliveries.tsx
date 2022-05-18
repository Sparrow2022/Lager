import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';
import DeliveryDetails from './DeliveryDetails';

const Stack = createNativeStackNavigator();

export default function Deliveries({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} />
            <Stack.Screen name="Form" component={DeliveryForm} />
            <Stack.Screen name="Details" component={DeliveryDetails} />
        </Stack.Navigator>
    );
};