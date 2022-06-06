import { render, fireEvent } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

// USE CASE:
// I Skapa Ny Leverans ska det finnas 4 fält

jest.mock("../components/ProductDropDown", () => "ProductDropDown");
jest.mock("../components/DateDropDown", () => "DateDropDown");

test('testing delivery form', async () => {
    const { getByTestId } = render(<DeliveryForm
        route={{reload: true}}
        navigation={() => false}
    />);

    const productDropDown = await getByTestId("product drop down");
    expect(productDropDown).toBeDefined();

    const deliveryDate = await getByTestId("delivery date");
    expect(deliveryDate).toBeDefined();

    const amount = await getByTestId("product amount");
    expect(amount).toBeDefined();

    const comment = await getByTestId("comment");
    expect(comment).toBeDefined();
});