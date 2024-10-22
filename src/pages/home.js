import { useEffect, useState } from 'react';
import ProductCart from '../components/productCart';
import { getAllProducts } from '../API/Endpoints/AppEndpoints';

const Home = () => {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();      
        if (Array.isArray(productsData)) {
          setProducts(productsData); 
        } else if (productsData && Array.isArray(productsData.products)) {
          setProducts(productsData.products); 
        } else {
          console.error('Unexpected data format:', productsData);
        }

      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className='text-3xl my-12'>List Products</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-5'>
        {products.length > 0 ? (
          products.map((product, key) => (
            <ProductCart key={key} data={product} /> 
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
