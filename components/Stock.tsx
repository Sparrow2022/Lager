import { useEffect } from 'react';
import { Text, View } from 'react-native';
import productModel from "../models/products";

function StockList({ products, setProducts }) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => {
        return <Text
            key={index}
        //style={{ ...Typography.normal }}
        >
            {product.name} - {product.stock}
        </Text>
    });

    return list;
}

export default function Stock({ products, setProducts }) {
    return (
        <View>
            <Text>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    )
}
