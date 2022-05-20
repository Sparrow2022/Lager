import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';
import Home from "./components/Home";
import OrdersHome from "./components/OrdersHome";
import DeliveriesHome from "./components/DeliveriesHome";

const Tab = createBottomTabNavigator();

export default function App() {

    const [products, setProducts] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="Lager">
                        {(screenProps) => <Home {...screenProps} products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Beställningar">
                        {(screenProps) => <OrdersHome {...screenProps} products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Inleveranser">
                        {(screenProps) => <DeliveriesHome {...screenProps} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const routeIcons = {
    "Lager": "home",
    "Beställningar": "list",
    "Inleveranser": "car"
};

const styles = StyleSheet.create({
    container: Base.container
});