import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from "react-native";
import { Base, Typography } from '../styles';

import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    base: Base.base,
    header: Typography.header1,
});