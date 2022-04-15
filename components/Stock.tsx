import { useState, useEffect } from 'react';
import { ProgressViewIOSComponent, Text, View } from 'react-native';
//@ts-ignore
import config from "../config/config.json";

function StockList(props: any) {
    const [products, setProducts] = useState<any[]>([]);
  
    useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => <Text style={props.styles.bulletpoint}key={index}>{'\u2022'} { product.name } - { product.stock }</Text>);
  
    return (
      <View>
        {list}
      </View>
    );
  }

export default function Stock(props: any) {
  return (
    <View>
      <Text style={props.styles.h2}>Lagerförteckning</Text>
      <StockList styles={props.styles}/>
    </View>
  );
}