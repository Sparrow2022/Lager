import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/authorisation';
import AuthFields from './AuthFields';
import ButtonCustom from './ButtonCustom';

export default function AuthLogout({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogout() {
        const result = await AuthModel.logout();
        setIsLoggedIn(false);
        navigation.navigate("Logga in");
    }

        return (
            <ButtonCustom
                title="Logga ut"
                send={true}
                onPress={() => {
                    doLogout();
                }}
            />
        )
};