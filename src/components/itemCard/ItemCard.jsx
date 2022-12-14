import React from 'react';
import style from './itemCard.css';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import { edit } from '../../img/icons';

function ItemCard({ uid, itemImage, itemName, price }) {
  //Get original price digit and without digit
  var priceDigit = getDigit(price);
  price = getNumber(price);

  //Limit the text to two lines, can be optimized by using CSS instead
  if (itemName.length > 47) {
    itemName = itemName.substring(0, 47);
    itemName += '...';
  }

  const dispatch = useDispatch();

  return (
    <div className='itemCard'>
      <Link
        className='itemImage'
        style={{ backgroundImage: 'url(' + itemImage + ')' }}
        to={'/Detail/' + uid}
      ></Link>

      <Link className='itemName' to={'/Detail/' + uid}>
        {itemName}
      </Link>
      <div className='prices'>
        <span className='currentPriceContainer'>
          <span className='currentPrice'>${price}</span>
          <span className='priceDigit'>
            {priceDigit.toString().padStart(2, 0)}
          </span>
        </span>
        {/* <span className='originalPrice'>
          <span className='currentPrice'>${originalPrice}</span>
          <span className='priceDigit'>{originalPriceDigit}</span>
        </span>
        <span>|</span>
        <span className='discount'>{discount}% Off</span> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            dispatch(addItem(uid));
          }}
          className='buttonStyle addToCart'
        >
          Add to Cart
        </button>
        <Link style={{ cursor: 'pointer' }} to={'/Listing/' + uid}>
          <img src={edit} alt='' />
        </Link>
      </div>
    </div>
  );
}
export default ItemCard;

ItemCard.PropType = {
  itemImages: PropType.string,
  itemName: PropType.string.isRequired,
  price: PropType.number.isRequired,
};

function getNumber(number) {
  number = Number(number);
  number = Math.floor(number);
  return number;
}

function getDigit(number) {
  number = Number(number);
  var digit = Math.floor(number.toFixed(2) * 100) % 100;
  return digit;
}
