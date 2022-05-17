import { useState } from "react";
import { Platform, View, ScrollView, Text, TextInput, Button} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base, Typography, Forms } from '../styles';
import Delivery from "../interfaces/delivery";

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button
                    onPress={showDatePicker}
                    title="Visa datumväljare"
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV')
                        });
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function DeliveryForm({route, navigation}) {

    const[delivery, setDelivery] = useState<Partial<Delivery>>({})

    function addDelivery() {
        // skicka delivery till delivery modellen
        // öka antalet produkter (use update product)
    }

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={Typography.header2}>Ny leverans</Text>
            <Text style={Typography.label}>Produkt namn</Text>
            {/* TODO: produktnamn */}
            <Text style={Typography.label}>Datum</Text>
            <Text style={Typography.header3}>{delivery?.delivery_date}</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}/>
            <Text style={Typography.label}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({...delivery, amount: parseInt(content)})
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                setDelivery({...delivery, comment: content})
                }}
                value={delivery?.comment}
            />


            <Button 
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
}