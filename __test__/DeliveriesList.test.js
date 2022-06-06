import { render, fireEvent } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

jest.mock("../components/ButtonCustom", () => "ButtonCustom");

// USE CASE:
// I Inleveranser ska det finnas ett meddelande att det inte finns några leveranser
// och en fungerande knapp för att skapa en ny leverans

const mockSubmit = jest.fn();

test('a message about no deliveries and a new-delivery button should exist', async () => {
    const { getByText, getByA11yLabel } = render(
        <DeliveriesList 
        route={{reload: true}} 
        navigation={{navigate: mockSubmit}}
        />);

    const message = await getByText("Det finns inga leveranser att visa");

    const a11yLabel = "Skapa ny inleverans genom att trycka";
    const submitButton = await getByA11yLabel(a11yLabel);

    expect(message).toBeDefined();
    expect(submitButton).toBeDefined();

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
});