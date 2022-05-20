import { Image, Text, ScrollView } from 'react-native';
import ProductList from './ProductList';
//@ts-ignore
import tools from '../assets/tools.jpg'
import { Base, Typography } from '../styles';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView style={Base.base}>
            <Image source={tools} style={Base.img} />
            <ProductList products={products} setProducts={setProducts} />
        </ScrollView>
    );
}