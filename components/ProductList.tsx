import { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import productModel from "../models/products";
import { Base, Typography } from '../styles';

export default function ProductList({ products, setProducts }) {
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