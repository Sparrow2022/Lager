import { render } from '@testing-library/react-native';
import ProductHome from '../components/ProductHome';

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<ProductHome />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});