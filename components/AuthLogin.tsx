import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/authorisation';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function AuthLogin({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });

            if (result.type === "success") {
                setIsLoggedIn(true);
                setAuth({ ...auth, password: "" })
                navigation.navigate("Logga ut");
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
                submit={doLogin}
                title="Logga in"
                navigation={navigation}
            />
        );
};