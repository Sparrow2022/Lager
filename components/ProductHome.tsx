import { Image, ScrollView, Text } from 'react-native';
import ProductList from './ProductList';
//@ts-ignore
import tools from '../assets/tools.jpg'
import { Base, Typography } from '../styles';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView style={[Base.base, {marginBottom: 20}]}>
            <Image source={tools} style={Base.img} />
            <Text style={Typography.header3}>Lagerförteckning</Text>
            <ProductList products={products} setProducts={setProducts} />
        </ScrollView>
    );
}