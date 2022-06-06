import { useState, useEffect } from "react";
import ButtonCustom from "./ButtonCustom";
import { Platform, View, ScrollView, Text, TextInput, Button} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        props.setDelivery({
            ...props.delivery,
            delivery_date: dropDownDate.toLocaleDateString('se-SV')
        });
    }, []);

    return (
        <View>
            {Platform.OS === "android" && (
                <ButtonCustom
                    onPress={showDatePicker}
                    title={dropDownDate.toLocaleDateString('se-SV')}
                    send={false}
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        if (date !== undefined) {
                            
                            setDropDownDate(date);
                            
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV')
                            });
                        }
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}