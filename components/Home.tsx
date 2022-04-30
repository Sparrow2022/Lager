import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import Stock from './Stock';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';
import { Base, Typography } from '../styles';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView style={styles.base}>
            <Text style={styles.header}>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    base: Base.base,
    header: Typography.header1,
});