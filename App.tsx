import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";

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
                    <Tab.Screen name="Plock">
                        {(screenProps) => <Pick {...screenProps} products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Inveleranser">
                        {(screenProps) => <Deliveries {...screenProps} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "airplane"
};

const styles = StyleSheet.create({
    container: Base.container
});