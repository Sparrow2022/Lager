import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCustom from "./ButtonCustom";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";


export default function ShipmentDetails({ route, navigation }) {
    const { order } = route.params;

    async function ship() {
        await orderModel.updateOrder({ ...order, status_id: 400 });
        navigation.navigate("Leveranser översikt", { reload: true });
    }

    return (
        <View style={styles.container}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }} >
                <Marker
                    coordinate={{ latitude: 56.17, longitude: 15.59 }}
                    title="En markör"
                />
            </MapView>
            <ButtonCustom title="Skicka" send={true} onPress={ship} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});