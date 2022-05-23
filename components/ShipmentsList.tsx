// OrderList.tsx
import { useState, useEffect } from 'react';
import { View } from "react-native";
import ButtonCustom from './ButtonCustom';
import orderModel from "../models/orders";
import Order from "../interfaces/order"
import { Base, Typography } from '../styles';

export default function ShipmentList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <ButtonCustom
                title={order.name}
                key={order.id}
                onPress={() => {
                    navigation.navigate('Skicka leverans', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            {listOfOrders}
        </View>
    );
}