import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCustom from "./ButtonCustom";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import getCoordinates from "../models/nominatim";


export default function ShipmentDetails({ route, navigation }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={order.name}
                description={`${order.address}, ${order.zip}, ${order.city}`}
            />);
        })();
    }, []);

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
                    latitudeDelta: 10,
                    longitudeDelta: 10,
                }} >
                {marker}
                <Marker
                    coordinate={{ latitude: 56.1612, longitude: 15.5869,}}
                    title={"Lager"}
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