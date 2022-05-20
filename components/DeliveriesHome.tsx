import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';
import DeliveryDetails from './DeliveryDetails';

const Stack = createNativeStackNavigator();

export default function DeliveriesHome({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista" component={DeliveriesList} />
            <Stack.Screen name="Formulär" component={DeliveryForm} />
            <Stack.Screen name="Detaljer" component={DeliveryDetails} />
        </Stack.Navigator>
    );
};