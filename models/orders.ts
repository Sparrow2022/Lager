import config from "../config/config.json";
import Order from "../interfaces/order"
import products from "./products";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order) {
        await Promise.all(order.order_items.map(async(order_item) => {
            let changedProduct = {
                id: order_item.product_id, 
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            }; 

            await products.updateProduct(changedProduct);
        }));

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },

    updateOrder: async function updateOrder(order){
        try {
            order.api_key = config.api_key;

            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("could not update the order");
        }
    }

};

export default orders;