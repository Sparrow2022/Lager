import { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import productModel from "../models/products";
import { Base, Typography } from '../styles';

function StockList({ products, setProducts }) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => {
        return <Text 
            style={Typography.normal }
            key={index}
        >
            {product.name} - {product.stock}
        </Text>
    });

    return list;
}

export default function ProductList({ products, setProducts }) {
    return (
        <View style={{marginBottom: 20}}>
            <Text style={Typography.header3}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    )
}