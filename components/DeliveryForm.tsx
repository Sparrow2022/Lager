import { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import ProductDropDown from "./ProductDropDown";
import { Base, Typography, Forms } from '../styles';
import ButtonCustom from "./ButtonCustom";
import Delivery from "../interfaces/delivery";
import Product from "../interfaces/product";
import productModel from "../models/products";
import deliveryModel from "../models/deliveries"
import { showMessage } from "react-native-flash-message";
import DateDropDown from "./DateDropDown";

export default function DeliveryForm({route, navigation}) {

    const[delivery, setDelivery] = useState<Partial<Delivery>>({})
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery(delivery : Partial<Delivery>) {

        if (delivery.product_id && delivery.delivery_date && delivery.amount) {
            let result = await deliveryModel.sendDelivery(delivery);

            showMessage({
            message: result.title,
            type: result.type
            });

            if (result.type === "success") {
            
                let productToChange = await (await productModel.getProducts()).find(p => p.id === delivery.product_id);
                
                let changedProduct = {
                    id: delivery.product_id, 
                    name: delivery.product_name,
                    stock: productToChange.stock + delivery.amount,
                }; 
                
                await productModel.updateProduct(changedProduct);
                navigation.navigate("Inleveranser översikt", { reload: true });
            }
        } else {
            showMessage({
                message: "Produkt, datum eller antal saknas",
                type: "warning",
            });
        }

    }

    return (
        <ScrollView style={{...Base.base}}>
            <Text style={Typography.label}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
                testID="product drop down"
            />
            <Text style={Typography.label}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                testID="delivery date"
            />
            <Text style={Typography.label}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({...delivery, amount: parseInt(content)})
                }}
                value={delivery?.amount?.toString() === "NaN" ? "" : delivery?.amount?.toString()}
                keyboardType="numeric"
                testID="product amount"
            />
            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                setDelivery({...delivery, comment: content})
                }}
                value={delivery?.comment}
                testID="comment"
            />
            <View>
                <ButtonCustom 
                    title="Gör inleverans"
                    send={true}
                    onPress={() => {
                        addDelivery(delivery);
                    }}
                />
            </View>
        </ScrollView>
    );
}