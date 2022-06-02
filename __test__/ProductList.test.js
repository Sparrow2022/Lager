import { render } from '@testing-library/react-native';
import ProductList from '../components/ProductList';

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<ProductList />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});