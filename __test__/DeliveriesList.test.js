import { render, fireEvent } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

jest.mock("../components/ButtonCustom", () => "ButtonCustom");

// USE CASE:
// I Inleveranser ska det finnas ett meddelande att det inte finns några leveranser
// och en knapp för att skapa en ny leverans

const mockSubmit = jest.fn();

test('a message about no deliveries and a new-delivery button should exist', async () => {
    const { getByText } = render(<DeliveriesList route={{reload: true}} navigation={{navigate: mockSubmit}}/>);

    const message = await getByText("Det finns inga leveranser att visa");
    const button = await getByText("Skapa ny inleverans");

    expect(message).toBeDefined();
    expect(button).toBeDefined();

    fireEvent.press(button);
    expect(mockSubmit).toHaveBeenCalled();
});