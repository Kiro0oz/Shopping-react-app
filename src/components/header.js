import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTab } from '../stores/cart';
import { closeSession } from '../API/Endpoints/AppEndpoints';

const Header = () => {
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false); 
  const carts = useSelector((store) => store.cart.items);
  const canCloseSession = useSelector((store) => store.cart.canCloseSessions);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalQuantity(carts.length);
  }, [carts]);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCloseSession = async () => {
    if (!canCloseSession) {
      alert('You must complete the order and payment before closing the session.');
      return;
    }

    if (session) {
      setLoading(true); 

      try {
        let res = await closeSession(session);
        if (res.message === 'Session has been closed successfully') {
          setSession(null);
          localStorage.removeItem('session');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error('Error closing session:', error);
      } finally {
        setLoading(false); 
      }
    } else {
      console.error('No active session to close.');
    }
  };

  return (
    <header className='flex justify-between items-center mb-5'>
      <div>
        <Link to='/' className='text-4xl font-semibold'>
          OEC
        </Link>
      </div>
      <div className='flex'>
        <div
          className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative'
          onClick={handleOpenTabCart}
        >
          <img src={iconCart} alt='' className='w-6 cursor-pointer' />
          <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
            {totalQuantity}
          </span>
        </div>
        <button
          className='ml-11 close_btn'
          onClick={handleCloseSession}
          disabled={loading}
        >
          {loading ? 'Exiting...' : 'Exit'} 
        </button>
      </div>
    </header>
  );
};

export default Header;
