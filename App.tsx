import { useState, useEffect } from 'react';
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
import InvoicesHome from './components/InvoicesHome';
import AuthHome from './components/AuthHome';
import authModel from "./models/authorisation";

const Tab = createBottomTabNavigator();

export default function App() {

    const [products, setProducts] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn());
        })();
    }, []);

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
                    {isLoggedIn && <Tab.Screen name="Faktura" component={InvoicesHome} />}
                    <Tab.Screen name="Användare">
                        {() => <AuthHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
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
    "Inleveranser": "car",
    "Användare": "person-outline",
    "Faktura": "document-text-outline",
};

const styles = StyleSheet.create({
    container: Base.container
});