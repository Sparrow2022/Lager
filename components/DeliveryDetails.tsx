import { Text, View } from "react-native";
import { Base, Typography } from '../styles';

export default function DeliveryDetails({ route, navigation }) {

    const { delivery } = route.params;

    return <View style={Base.base}>
            <Text style={Typography.normal}>Produkt: {delivery.product_name}</Text>
            <Text style={Typography.normal}>Antal: {delivery.amount}</Text>
            <Text style={Typography.normal}>Leveransdatum: {delivery.delivery_date}</Text>
            <Text style={Typography.normal}>Kommentar: {delivery.comment}</Text>
        </View>
}