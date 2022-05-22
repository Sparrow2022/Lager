import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
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
                    navigation.navigate('Detaljer', {
                        delivery: delivery
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            {listOfDeliveries.length === 0 ? <Text style={Typography.header3}>Det finns inga leveranser att visa</Text> : listOfDeliveries}
            <ButtonCustom
                title="Skapa ny inleverans"
                send={true}
                onPress={() => {
                    navigation.navigate('Skapa ny leverans');
                }}
            />
        </View>
    );
}