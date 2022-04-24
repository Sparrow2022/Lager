import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import Stock from './Stock';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView>
            <Text>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}