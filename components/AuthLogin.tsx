import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/authorisation';
import AuthFields from './AuthFields';
import ButtonCustom from './ButtonCustom';

export default function AuthLogin({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            setIsLoggedIn(true);
            navigation.navigate("Logga ut");
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