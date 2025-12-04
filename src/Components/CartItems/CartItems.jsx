import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // show overlay
    setOrderPlaced(true);

  };

  const handleGoHome = () => {
    setOrderPlaced(false);
    navigate('/');
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {Array.isArray(all_product) && all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => { removeFromCart(e.id); }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item-total">
              <p>Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
          </div>
          <button onClick={handlePlaceOrder}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type='text' placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {orderPlaced && (
        <div className="order-overlay" role="dialog" aria-modal="true">
          <div className="order-overlay-card">
            <h1>🎉 Order Placed!</h1>
            <p>Thank you — your order has been placed successfully.</p>

            <div className="order-actions">
              <button className="order-home-btn" onClick={handleGoHome}>
                Go to Home
              </button>

              <button className="order-close-btn" onClick={() => setOrderPlaced(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
