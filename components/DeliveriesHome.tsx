import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';
import DeliveryDetails from './DeliveryDetails';

const Stack = createNativeStackNavigator();

export default function DeliveriesHome({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="Inleveranser översikt">
            <Stack.Screen name="Inleveranser översikt" component={DeliveriesList} />
            <Stack.Screen name="Skapa ny leverans" component={DeliveryForm} />
            <Stack.Screen name="Detaljer" component={DeliveryDetails} />
        </Stack.Navigator>
    );
};