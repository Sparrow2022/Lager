import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import { DataTable } from "react-native-paper";
import ButtonCustom from './ButtonCustom';
import invoiceModel from "../models/invoices";
import Invoice from "../interfaces/invoice";

function InvoicesTable(props) {

    const table = props.allInvoices.map((invoice: Invoice, index: number) => {
        return (
            <DataTable.Row key={index} style={{flexDirection: "row", backgroundColor: index % 2 === 0 ? "lightgrey" : ""}}>
                <DataTable.Cell style={{ flex: 3}}>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1 }}>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 2 }}>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <DataTable>
            <DataTable.Header style={{flexDirection: "row"}}>
                <DataTable.Title style={{ flex: 3 }}>Namn</DataTable.Title>
                <DataTable.Title numeric style={{ flex: 1 }}>Pris</DataTable.Title>
                <DataTable.Title numeric style={{ flex: 2 }}>Förfallodatum</DataTable.Title>
            </DataTable.Header>
            {table}
        </DataTable>
    );
}

export default function InvoicesList({ route, navigation }) {
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

    return (
        <View style={Base.base}>
            {allInvoices.length === 0 ? <Text style={Typography.header3}>Det finns inga fakturor att visa</Text> : <InvoicesTable allInvoices={allInvoices} />}
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