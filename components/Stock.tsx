import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import productModel from "../models/products";
import { Base, Typography } from '../styles';

function StockList({ products, setProducts }) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => {
        return <Text 
            style={styles.normal }
            key={index}
        >
            {product.name} - {product.stock}
        </Text>
    });

    return list;
}

export default function Stock({ products, setProducts }) {
    return (
        <View style={styles.padding}>
            <Text style={styles.header3}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    )
}

const styles = StyleSheet.create({
    base: Base.base,
    header3: Typography.header3,
    normal: Typography.normal,
    padding: Base.padding
});