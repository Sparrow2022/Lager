import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import orderModel from "../models/orders";
import productModel from "../models/products";
import { Base, Typography } from '../styles';


export default function PickList({ route, navigation, setProducts }) {
    const { reload } = route.params || false;
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    if (reload) {
        reloadProducts();
    }

    async function reloadProducts() {
        setProductsList(await productModel.getProducts());
    }

    useEffect(() => {
        reloadProducts();
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const productsHash = productsList.reduce((hash, current) => ({...hash, [current.id]: current.stock}), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.account) {
            allInStock = false;
        }
        return <Text 
            style={styles.indented}
            key={index}
        >
            {item.name} - {item.amount} - {item.location}
        </Text>;
    });

    return (
        <View style={styles.base}>
            <Text style={styles.normal}>{order.name}</Text>
            <Text style={styles.normal}>{order.address}</Text>
            <Text style={styles.normal}>{order.zip} {order.city}</Text>

            <Text style={styles.bold}>Produkter:</Text>

            {orderItemsList}

            {allInStock
                ? <Button color="black" title="Plocka order" onPress={pick} />
                : <Text>Ordern går inte att packa, då varor saknas</Text>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    base: Base.base,
    header3: Typography.header3,
    normal: Typography.normal,
    indented: Typography.indented,
    bold: Typography.bold
});