import React from 'react';
import style from './Cart.css';
import { db } from '../../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { plus, subtract, trash } from '../../img/icons';
import {
  removeItem,
  increaseCount,
  decreaseCount,
  clearCart,
} from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

function Cart({ inventory }) {
  document.title = 'Cart';
  const navigate = useNavigate();

  //get cart items from redux
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  var cartItemQuantity = 0;
  var cartItemTotal = 0;

  //get cart total
  cartItems.map((item) => {
    cartItemQuantity += item.quantity;

    var inventoryFind = inventory.find((e) => e.uid === item.uid);
    if (inventoryFind) {
      cartItemTotal += inventoryFind.price * item.quantity;
    }
    return cartItemTotal;
  });
  console.log(cartItemQuantity);
  return (
    <div className='pageContainer'>
      <div className='cart'>
        <h1>Cart</h1>
        {/* generate cart item card */}
        {cartItems.map((item, index) => {
          var inventoryFind = inventory.find((e) => e.uid === item.uid);
          return (
            <div className='cartItem' key={index}>
              <div className='imgContainer'>
                {inventoryFind ? (
                  <div
                    className='itemImg'
                    style={{
                      backgroundImage: 'url(' + inventoryFind.imgURL + ')',
                    }}
                  ></div>
                ) : (
                  <div className='itemImg'></div>
                )}
              </div>

              <div className='itemDetail'>
                <div className='itemName'>
                  {inventoryFind ? inventoryFind.itemName : ''}
                </div>
                <div className='itemUnitPrice'>
                  ${inventoryFind ? inventoryFind.price : ''}/ea.
                </div>
              </div>
              <div className='itemTotal'>
                <div className='itemCount'>
                  <button
                    onClick={() => dispatch(decreaseCount(item.uid))}
                    className='countBtn subtractItem'
                  >
                    <img src={subtract} alt='' />
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    onClick={() => dispatch(increaseCount(item.uid))}
                    className='countBtn addItem'
                  >
                    <img src={plus} alt='' />
                  </button>
                </div>
                <div className='itemTotalPrice'>
                  $
                  {inventoryFind
                    ? (inventoryFind.price * item.quantity).toFixed(2)
                    : ''}
                </div>
              </div>

              <button
                onClick={() => {
                  dispatch(removeItem(item.uid));
                }}
                className='remove'
              >
                <img src={trash} alt='' />
              </button>
            </div>
          );
        })}
      </div>
      <div className='summary'>
        <div className='summaryHeader'>
          <h1>Cart Subtotal </h1>
          <p>
            ({cartItemQuantity} item
            {cartItemQuantity > 1 ? 's' : ''})
          </p>
        </div>
        <div className='priceBreakdown'>
          <div className='subtotal'>
            <span>Subtotal</span>
            <span>${cartItemTotal.toFixed(2)}</span>
          </div>
          <div className='discount'>
            <span>Discount</span>
            <span>$0</span>
          </div>
          <div className='shipping'>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className='tax'>
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div className='total'>
            <span>Estimated Total</span>
            <span>${cartItemTotal.toFixed(2)}</span>
          </div>
        </div>
        {cartItemQuantity > 0 ? (
          <button
            onClick={() => {
              dispatch(clearCart());
              navigate('/');
            }}
            className='checkOut'
          >
            Check Out
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Cart;
