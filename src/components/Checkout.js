import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createOrder } from '../API/Endpoints/AppEndpoints';
import Payment from './payment';
import './style.css';

const Checkout = ({ totalAmount, onClose }) => {
    const carts = useSelector(store => store.cart.items);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [orderId, setOrderId] = useState(0);
    const [isPayment, setIsPayment] = useState(false);
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(false); 

    // const [isOrderCompleted, setIsOrderCompleted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (carts.length === 0) {
            setError('Cart is empty.');
            return;
        }
    
        setIsSubmitting(true);
        setError(null);
    
        const session_id = +localStorage.getItem('session');
        if (!session_id) {
            setError('Session ID not found. Please log in again.');
            setIsSubmitting(false);
            return;
        }
    
        try {
            const response = await createOrder(session_id, carts); 
            setOrderId(response.Order_id);
            setSuccess(true);
            setTimeout(() => {
                setIsPayment(true); 
                setSuccess(false);   
            }, 2000); 
        } catch (error) {
            setError('Failed to create the order. Please try again.');
            console.error("Error creating order:", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClosePayment = () => {
        setIsPayment(false);
        onClose();
    };

    return (
        <>
        {/* Checkout Modal (Hidden when isPayment is true) */}
        {!isPayment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 checkout_model">
                <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
                    <p className="text-xl mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>

                    {/* Show error if any */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="checkout_btns">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`bg-green-600 text-white p-2 rounded ${isSubmitting ? 'opacity-50' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Checkout'}
                        </button>
                        <button className="text-red-500 mt-4" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        )}

        {/* Success message modal */}
        {success && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 checkout_model">
                <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Order Confirmed</h2>
                    <p>Your order has been placed successfully!</p>
                </div>
            </div>
        )}

        {/* Payment Modal */}
        {isPayment && <Payment onClose={handleClosePayment} orderId={orderId} totalAmount={totalAmount} />}
        </>
    );
};

export default Checkout;
