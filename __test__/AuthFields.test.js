import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/AuthFields';

// USE CASE:
// I Logga In vy ska det finnas ett email-fält och ett lösenord fält, samt en fungerande knapp

jest.mock("../components/ButtonCustom", () => "ButtonCustom");

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

    const emailField = await getByTestId("email-field");
    expect(emailField).toBeDefined();

    const passwordField = await getByTestId("password-field");
    expect(passwordField).toBeDefined();

    const a11yLabel = `${title} genom att trycka`
    const submitButton = await getByA11yLabel(a11yLabel);
    expect(submitButton).toBeDefined();

    const fakeEmail = "fake@fake.se";
    fireEvent.changeText(emailField, fakeEmail);
    expect(auth?.email).toEqual(fakeEmail);

    const fakePassword = "Fake123";
    fireEvent.changeText(passwordField, fakePassword);
    expect(auth?.password).toEqual(fakePassword);

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
});