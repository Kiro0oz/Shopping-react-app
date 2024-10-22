import React, { useState } from 'react';
import { createPayment } from '../API/Endpoints/AppEndpoints';
import { useDispatch } from 'react-redux'; 
import { clearCart, setCanCloseSessions } from '../stores/cart';

const Payment = ({ orderId, totalAmount, onClose }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash'); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const dispatch = useDispatch();



    const handlePayment = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage(''); 

        const paymentMethodValue = paymentMethod === 'cash' ? 1 : 2; 
        try {
            const paymentResponse = await createPayment(orderId, totalAmount, paymentMethodValue);
            dispatch(setCanCloseSessions(true));
            setSuccessMessage('Payment was successful!');
            dispatch(clearCart()); 
        } catch (error) {
            console.error('Payment Failed:', error.message);
            setErrorMessage(error.message || 'Payment failed. Please try again.'); 
        }
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                <form onSubmit={handlePayment}>
                    <div className="mb-4">
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                className="mr-2"
                            />
                            Cash
                        </label>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={() => setPaymentMethod('credit')}
                                className="mr-2"
                            />
                            Credit
                        </label>
                    </div>
                    <p className="text-lg font-bold mb-4">Total Amount: ${totalAmount}</p>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Pay Now
                    </button>
                </form>
                <button className="absolute top-2 right-2 text-red-500 font-bold" onClick={onClose}>
                    &times;
                </button>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Payment;
