// OrderList.tsx
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import config from "./../config/config.json";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

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
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                color="#000000"
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={styles.header3}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}

const styles = StyleSheet.create({
    header3: Typography.header3
});