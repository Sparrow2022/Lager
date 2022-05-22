import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ButtonCustom from "./ButtonCustom";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';


export default function ShipmentDetails({ route, navigation }) {
    const { reload } = route.params || false;
    const { order } = route.params;

    async function ship() {
        await orderModel.updateOrder({...order, status_id: 400});
        navigation.navigate("Leveranser översikt", { reload: true });
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <ButtonCustom title="Skicka" send={true} onPress={ship} />

        </View>
    )
};