import { View, Text, TextInput, Button } from "react-native";
import ButtonCustom from "./ButtonCustom";
import { Typography, Forms, Base } from '../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={Base.base}>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
            />
            <View style={{ marginTop: 30 }}>
                <ButtonCustom
                    title={title}
                    send={true}
                    onPress={() => {
                        submit();
                    }}
                />
                {title === "Logga in" &&
                    <ButtonCustom
                        title="Registrera istället"
                        send={false}
                        onPress={() => {
                            navigation.navigate("Registrera");
                        }}
                    />
                }
            </View>
        </View>
    );
};