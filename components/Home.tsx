import { Image, Text, ScrollView } from 'react-native';
import Stock from './Stock';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';
import { Base, Typography } from '../styles';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Lager-Appen</Text>
            <Image source={warehouse} style={Base.img} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}