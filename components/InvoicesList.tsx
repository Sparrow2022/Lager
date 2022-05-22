import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import ButtonCustom from './ButtonCustom';
import invoiceModel from "../models/invoices";
import Invoice from "../interfaces/invoice";

export default function InvoicesList({route, navigation}) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const listOfInvoices = allInvoices
        .map((invoice, index) => {
        return <View>
            <Text>{invoice.name}</Text>
            <Text>{invoice.due_date}</Text>
            <Text>{invoice.total_price}</Text>
        </View>
        });

    return (
        <View style={Base.base}>
            {listOfInvoices.length === 0 ? <Text style={Typography.header3}>Det finns inga fakturor att visa</Text> : listOfInvoices}
            <ButtonCustom
                title="Skapa ny faktura"
                send={true}
                onPress={() => {
                    navigation.navigate('Skapa ny faktura');
                }}
            />
        </View>
    );
}