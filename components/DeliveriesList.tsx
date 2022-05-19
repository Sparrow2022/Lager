import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Base, Typography } from '../styles';
import ButtonCustom from './ButtonCustom';
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
            return <ButtonCustom
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
            {listOfDeliveries ? listOfDeliveries : <Text>Det finns inga leveranser att visa</Text>}
            <ButtonCustom
                title="Skapa ny inleverans"
                send={true}
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );
}