import { render } from '@testing-library/react-native';
import AuthFields from '../components/AuthFields';

// USE CASE:
// 

let title = "Logga in";
let auth = {}
const setAuth = (newAuth) => {
    auth = newAuth;
};
const mockSubmit = jest.fn();
const navigation = () => false;

test('testing authFields for login', async () => {
    const { getAllByText } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    const titleElements = await getAllByText(title);

    expect(titleElements.length).toBe(1);
});