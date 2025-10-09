import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
 const {fetchStoreAProducts} = await import("host_app/store/apis");

 import Card from '../Components/Card.js';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.storeAProducts.products);

  useEffect(() => {
    dispatch(fetchStoreAProducts())
  }, [dispatch]);


  return (
    <div>
      <p>Product Listing for Store A</p>

      {products && products?.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {products.map(product => ( 
            <Card key={product.id} productObj={product} />
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  )
}