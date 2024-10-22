import React from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import './style.css';

const ProductCart = (props) => {
    const disc = 0;
    const { id, name, price, image_url } = props.data;
    const dispatch = useDispatch();
    
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            name: name,
            quantity: 1,
            price: price,
            discount: 0.0
        }));
    }

    return (
        <>
            <div className='bg-white p-5 rounded-xl shadow-sm product_card'>
                {disc > 0 &&          
                <div className='discount'>
                    {((disc / price) * 100).toFixed()}%
                </div>
                }
                <Link>
                    <img src={image_url} alt='' className='w-full h-80 object-cover object-top ' />
                </Link>
                <h3 className='text-2xl py-3 text-center font-medium' style={{marginBottom: '30px'}}>{name}</h3>
                <div className='flex justify-between items-center'>
                    <p>
                        $<span className='text-2xl font-medium'>{price}</span>
                    </p>
                    <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2' onClick={handleAddToCart}>
                        <img src={iconCart} alt="" className='w-5' />
                        Add To Cart
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductCart;
