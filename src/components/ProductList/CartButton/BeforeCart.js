import React,{memo} from 'react'
import './CartButtons.css'
import { useDispatch } from 'react-redux'
import { addTocart } from '../../../redux/cart';


const BeforeCart = ({product}) => {
  const dispatch = useDispatch();
  return (
    <div className='before-cart'>
      <button className='add-cart-button' onClick={()=> dispatch(addTocart(product))}>
      Add to cart
      </button>
    </div>
  );
};

export default memo(BeforeCart);
