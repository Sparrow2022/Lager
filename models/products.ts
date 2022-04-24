import OrderItem from '../interfaces/orderitem'
import config from "../config/config.json";

const products = {

    getProducts: async function getProducts(): Promise<OrderItem[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        console.log("hello");
        return result.data;
    }
};

export default products