import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthLogin from './AuthLogin';
import AuthLogout from './AuthLogout';
import AuthRegister from './AuthRegister';

const Stack = createNativeStackNavigator();

export default function AuthHome(props) {
    return (
        <Stack.Navigator initialRouteName={props.isLoggedIn ? "Logga ut" : "Logga in"}>
            <Stack.Screen name="Logga in">
                {(screenProps) => <AuthLogin navigation={screenProps.navigation} setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Registrera" component={AuthRegister} />
            <Stack.Screen name="Logga ut">
                {(screenProps) => <AuthLogout {...screenProps} setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};