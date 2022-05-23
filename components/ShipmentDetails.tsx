import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCustom from "./ButtonCustom";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import getCoordinates from "../models/nominatim";
import * as Location from 'expo-location';


export default function ShipmentDetails({ route, navigation }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
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
        navigation.navigate("Ordrar redo att skickas", { reload: true });
    }

    return (
        <View style={[styles.container, Base.base]}>
            <Text style={Typography.header4}>{order.name}</Text>
            <Text style={Typography.header4}>{order.address}</Text>
            <Text style={Typography.header4}>{order.zip} {order.city}</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
            <ButtonCustom title="Skicka" send={true} onPress={ship} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "85%",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});