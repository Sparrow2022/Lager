import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import Stock from './Stock';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';

export default function Home({products, setProducts}) {
  return (
      <ScrollView style={styles.base}>
          <Text>Lager-Appen</Text>
          <Image source={warehouse} style={{ width: 320, height: 240, marginBottom: 28 }} />
          <Stock products={products} setProducts={setProducts} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#FFF0D1',
    paddingLeft: 15,
    paddingRight: 15,
  },
  h1: {
    color: '#4D6694',
    fontSize: 50,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold'
  },
  h2: {
    color: '#4D6694',
    fontSize: 30,
    paddingTop: 25,
    paddingBottom: 15
  },
  bulletpoint: {
    fontSize: 20,
    paddingBottom: 10,
    marginLeft: 15
  }
});