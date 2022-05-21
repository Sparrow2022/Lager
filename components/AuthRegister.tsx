import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/authorisation';
import AuthFields from './AuthFields';

export default function AuthRegiter({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function register() {
        console.log("register");
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            // setIsLoggedIn(true);
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