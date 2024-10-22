import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity, clearCart } from '../stores/cart';
import { getProductImgById } from '../API/Endpoints/AppEndpoints'; // Import your API endpoint

const CartItem = (props) => {
    const { productId, quantity } = props.data; 
    const [detail, setDetail] = useState(null); 
    const dispatch = useDispatch();

    // Fetch product details from backend using productId
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productDetails = await getProductImgById(productId);
                setDetail(productDetails); 
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // Handle decrease in quantity
    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    };

    // Handle increase in quantity
    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };



    if (!detail) {
        return <p>Loading...</p>; // Show loading message until product details are fetched
    }

    return (
        <>
        <div>
            <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
                <img src={detail.image} alt={detail.name} className='w-12' /> {/* Use the dynamic image URL */}
                <h3>{detail.name}</h3> 
                <p>${detail.price * quantity}</p> 
                <div className='w-20 flex justify-between gap-2'>
                    <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
                    <span>{quantity}</span>
                    <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
                </div>
            </div>    
        </div>  
        </>    
    );
};

export default CartItem;
