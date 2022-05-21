import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from './InvoicesList';
import InvoicesForm from './InvoicesForm';

const Stack = createNativeStackNavigator();

export default function InvoicesHome({route, navigation}) {
    return (
        <Stack.Navigator initialRouteName="Fakturor översikt">
            <Stack.Screen name="Fakturor översikt" component={InvoicesList} />
            <Stack.Screen name="Skapa ny faktura" component={InvoicesForm} />
        </Stack.Navigator>
    );
};