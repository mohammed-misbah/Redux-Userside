import React from 'react'
import products from "../../api/products.json";
// import BeforeCart from './CartButton/BeforeCart';
// import AfterCart from './CartButton/AfterCart';
import { useSelector} from 'react-redux';
import './ProductList.css';
import CartButtons from './CartButton';
// import cart from '../../redux/cart';

const ProductList = () => {
  const {cartList} = useSelector((state) => state.cart)
  // const [ isAdded, setIsAdded ] = useState(false);
//   const dispatch = useDispatch();
  console.log(cartList);

  return (
    <section className='container'>
        {products?.map((product,key)=>(
            <div className='product-container' key={key}>
                <img src ={product?.image} alt=''/>
                <h2>{product?.title}</h2>
                <CartButtons product={product}/>
            </div>
        ))}
    </section>
  );
};

export default ProductList
