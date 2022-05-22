import config from "../config/config.json";
import storage from "./storage";
import Invoice from "../interfaces/invoice"

const invoices = {

    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const token = await (await storage.readToken()).token;
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
              'x-access-token': token
            },
        });
        const result = await response.json();
        return result.data;
    },

    sendInvoice: async function sendInvoice(invoice : Partial<Invoice>) {

        const token = await (await storage.readToken()).token;
        try {
            invoice.api_key = config.api_key;

            await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                method: 'POST'
            });
        } catch (error) {
            console.log("could not send the invoice");
        }
    }
}

export default invoices;