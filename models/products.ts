import OrderItem from '../interfaces/orderitem'
import config from "../config/config.json";

const products = {

    getProducts: async function getProducts(): Promise<OrderItem[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    updateProduct: async function updateProduct(product){
        try {
            product.api_key = config.api_key;

            await fetch(`${config.base_url}/products`, {
                body: JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("could not update the product");
        }
    }
};

export default products