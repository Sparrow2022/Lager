    import { useState, useEffect } from "react";
import { Platform, View, ScrollView, Text, TextInput, Button} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Base, Typography, Forms } from '../styles';
import ButtonCustom from "./ButtonCustom";
import Delivery from "../interfaces/delivery";
import Product from "../interfaces/product";
import productModel from "../models/products";
import deliveryModel from "../models/deliveries"
import { showMessage } from "react-native-flash-message";

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts());
        })();
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id || "Välj en produkt"}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        props.setDelivery({
            ...props.delivery,
            delivery_date: dropDownDate.toLocaleDateString('se-SV')
        });
    }, []);

    return (
        <View>
            {Platform.OS === "android" && (
                <ButtonCustom
                    onPress={showDatePicker}
                    title={dropDownDate.toLocaleDateString('se-SV')}
                    send={false}
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        if (date !== undefined) {
                            
                            setDropDownDate(date);
                            
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV')
                            });
                        }
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

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
            />
            <Text style={Typography.label}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}/>
            <Text style={Typography.label}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({...delivery, amount: parseInt(content)})
                }}
                value={delivery?.amount?.toString() === "NaN" ? "" : delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                setDelivery({...delivery, comment: content})
                }}
                value={delivery?.comment}
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