import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/authorisation';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function AuthRegiter({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function register() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });

            if (result.type === "success") {
                navigation.navigate("Logga in");
            }
        } else {
            showMessage({
                message: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={register}
            title="Registrera"
            navigation={navigation}
        />
    );
};