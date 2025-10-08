import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
 const {fetchProducts} = await import("host_app/store/apis");

export default function Products() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);


  return (
    <div>
      <p>Product Listing for Store A</p>
      <p>{cartItems.length} items in cart</p>
      {products && products?.length > 0 ? (
        <ul>
          {products.map(product => ( 
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>   
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  )
}