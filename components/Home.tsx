import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={styles.h1}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
        <Stock styles={styles}/>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
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