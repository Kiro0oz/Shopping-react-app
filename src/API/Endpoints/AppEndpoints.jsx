import { DOMAIN } from "../Config";
import axios from 'axios';


// Get All Products
export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${DOMAIN}/v1/pro/test`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching products');
    }
};

// Get Product Img by Id
export const getProductImgById = async (productId) => {
    try {
        const response = await axios.get(`${DOMAIN}/v1/pro/test/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching product');
    }
};

// Create Session
export const createSession = async () => {
    try {
        const response = await axios.post(`${DOMAIN}/v1/pos/test`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating session');
    }
};

// Close Session
export const closeSession = async (sessionId) => {
    try {
        const response = await axios.post(`${DOMAIN}/v1/session/close`, {
            url: `${DOMAIN}`,
            db: "mtaman-251-betlife-main-15733106",
            username: "admin",
            password: "admin",
            session_id: sessionId
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error closing session');
    }
};

// Create Order
export const createOrder = async (session_id, cartItems) => {
    const orderLines = cartItems.map(item => ({
        product_id: item.productId,
        name: item.name,
        qty: item.quantity,
        price_unit: item.price,
        discount: item.discount || 0.0
    }));
    
    const orderData = {
        session_id: session_id,
        user_id: 2,
        order_lines_ids: orderLines
    };

    try {
        const response = await axios.post(`${DOMAIN}/v1/pos/porder`, orderData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating order');
    }
};

//create Payment
export const createPayment = async (order_id, amount, payment_method) => {
    const paymentData = {
        order_id: order_id,
        amount: amount,
        payment_method_id: payment_method,
        name: "API Order Payment"
    };

    try {
        const response = await axios.post(`${DOMAIN}/v1/pos/payment`, paymentData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating payment');
    }
};