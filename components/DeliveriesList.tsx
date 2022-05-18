import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Base, Typography } from '../styles';
import deliveryModel from "../models/deliveries";
import Delivery from "../interfaces/delivery";

export default function DeliveriesList({route, navigation}) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <Button
                color="#000000"
                title={delivery.product_name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        delivery: delivery
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );
}

// const styles = StyleSheet.create({
//     base: Base.base,
//     header3: Typography.header3,
//     normal: Typography.normal,
//     padding: Base.padding
// });