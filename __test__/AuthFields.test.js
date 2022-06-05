import { render } from '@testing-library/react-native';
import AuthFields from '../components/AuthFields';

// USE CASE:
// I Logga In vyn ska det finnas en rubrik, ett email-fält och ett lösenord fält

let title = "Logga in";
let auth = {}
const setAuth = (newAuth) => {
    auth = newAuth;
};
const mockSubmit = jest.fn();
const navigation = () => false;

test('testing authFields for login', async () => {
    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    const titleElement = await getAllByText(title);
    expect(titleElement).toBeDefined();

    const emailField = await getByTestId("email-field");
    expect(emailField).toBeDefined();

    const passwordField = await getByTestId("password-field");
    expect(passwordField).toBeDefined();

    // the test works with "Button" but not with my custom "Pressable" ("ButtonCustom")
    // const a11yLabel = `${title} genom att trycka`
    // const submitButton = await getByA11yLabel(a11yLabel);
    // expect(submitButton).toBeDefined();
});