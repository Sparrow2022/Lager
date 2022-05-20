import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ButtonCustom from "./ButtonCustom";
import orderModel from "../models/orders";
import productModel from "../models/products";
import { Base, Typography } from '../styles';


export default function OrderDetails({ route, navigation, setProducts }) {
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
        navigation.navigate("Lista", { reload: true });
    }

    const productsHash = productsList.reduce((hash, current) => ({...hash, [current.id]: current.stock}), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.account) {
            allInStock = false;
        }
        return <Text 
            style={Typography.indented}
            key={index}
        >
            {item.name} - {item.amount} - {item.location}
        </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={Typography.bold}>Produkter:</Text>

            {orderItemsList}

            {allInStock
                ? <ButtonCustom title="Plocka beställning" send={true} onPress={pick} />
                : <Text>Ordern går inte att packa, då varor saknas</Text>
            }

        </View>
    )
};