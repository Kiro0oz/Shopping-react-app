import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import CartItem from './cartItem';
import { toggleStatusTab, clearCart } from '../stores/cart';
import Checkout from './Checkout'; 

const CartTab = () => {
    const [isCheckoutOpen, setCheckoutOpen] = useState(false); 

    const carts = useSelector(store => store.cart.items);
    const orderId = useSelector(store => store.cart.orderId); 
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();    

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    const totalAmount = carts.reduce((total, item) => total + item.price * item.quantity, 0);

    const openCheckout = () => {
        if(carts.length > 0) {
            setCheckoutOpen(true);
        }
    }

    const closeCheckout = () => {
        setCheckoutOpen(false);
    }

    const handleClearCart = () => {
        dispatch(clearCart()); 
    };

    return (
        <>
        
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
        transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}`}>
            <h2 className='p-5 text-white text-2xl'>Cart</h2>
            <div className='p-5 overflow-y-auto' style={{ maxHeight: 'calc(100% - 10px)' }}> 
                {carts.length > 0 ? (
                    carts.map((item, key) => 
                        <CartItem key={key} data={item}/>
                    )
                ) : (
                    <p className='text-white'>Your cart is empty.</p>
                )}
                {carts.length !== 0 &&                
                 <button
                    className="bg-red-600 text-white p-2 rounded mt-4"
                    onClick={handleClearCart}
                >
                    Clear All
                </button>}
            </div>
            <div className='p-5 text-white'>
                <p className='text-xl'>Total: ${totalAmount.toFixed(2)}</p>
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white p-4' onClick={handleCloseTabCart}>CLOSE</button>
                <button className='bg-amber-600 text-white p-4' onClick={openCheckout}>CHECKOUT</button>
            </div>

        </div>
            {/* Checkout Modal */}
            {isCheckoutOpen && <Checkout totalAmount={totalAmount} onClose={closeCheckout} />}

           
        </>
    );
}

export default CartTab;
