export default interface OrderItem {
    order_id: number,
    product_id: string, 
    amount: number,
    api_key: string,
    article_number: string,
    name: string,
    description: string,
    specifiers: object,
    stock: number,
    location: string,
    price: number
};