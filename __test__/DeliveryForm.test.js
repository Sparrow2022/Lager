import { render, fireEvent } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

// USE CASE:
// I Skapa Ny Leverans ska det finnas 4 fält och en knapp

jest.mock("../components/ProductDropDown", () => "ProductDropDown");

test('testing delivery form', async () => {
    const { getAllByText, getByTestId, getByA11yLabel } = render(<DeliveryForm
        route={{reload: true}}
        navigation={() => false}
    />);

    const productDropDown = await getByTestId("product drop down");
    expect(productDropDown).toBeDefined();


    // const fakeEmail = "fake@fake.se";
    // fireEvent.changeText(emailField, fakeEmail);
    // expect(auth?.email).toEqual(fakeEmail);

    // //doesn't work with custom pressable!
    // fireEvent.press(submitButton);
    // expect(mockSubmit).toHaveBeenCalled();
});