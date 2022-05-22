import { useState, useEffect } from "react";
import { Platform, View, ScrollView, Text, TextInput} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Base, Typography, Forms } from '../styles';
import ButtonCustom from "./ButtonCustom";
import Invoice from "../interfaces/invoice";
import Order from "../interfaces/order";
import orderModel from "../models/orders";
import invoiceModel from "../models/invoices";

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let productsHash: any = {};

    useEffect(() => {
        (async () => {
            let allOrders = await orderModel.getOrders();
            setOrders(allOrders.filter(order => order.status === "Skickad"));
        })();
    }, []);

    const itemsList = orders.map((ord, index) => {
        productsHash[ord.id] = ord;
        return <Picker.Item key={index} label={ord.name} value={ord.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id || "Välj en beställning"}
            onValueChange={(itemValue) => {
                props.setCurrentOrder(productsHash[itemValue]);
                const totalPrice = orderModel.getTotalPrice(productsHash[itemValue]);
                props.setInvoice({ ...props.invoice, order_id: itemValue, total_price: totalPrice });
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        props.setInvoice({
            ...props.invoice,
            due_date: dropDownDate.toLocaleDateString('se-SV')
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
                            
                            props.setInvoice({
                                ...props.invoice,
                                due_date: date.toLocaleDateString('se-SV')
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

export default function InvoicesForm({route, navigation}) {

    const[invoice, setInvoice] = useState<Partial<Invoice>>({})
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice(invoice : Partial<Invoice>) {
        await invoiceModel.sendInvoice(invoice);

        let changedOrder = {
            id: currentOrder.id, 
            status_id: 600,
        }; 

        await orderModel.updateOrder(changedOrder);
        navigation.navigate("Fakturor översikt", { reload: true });
    }

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={Typography.label}>Beställning</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
                currentOrder={currentOrder}
            />
            <Text style={Typography.label}>Förfallodatum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}/>
            <View>
                <ButtonCustom 
                    title="Skapa faktura"
                    send={true}
                    onPress={() => {
                        setInvoice({...invoice, creation_date: (new Date()).toLocaleDateString('se-SV')})
                        addInvoice(invoice);
                    }}
                />
            </View>
        </ScrollView>
    );
}