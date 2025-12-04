import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setOrderProcessing(true);

    setTimeout(() => {
      setOrderProcessing(false);
      setOrderPlaced(true);
    }, 2000);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='cartitems'>

      {/* Order processing loader */}
      {orderProcessing && (
        <div className='order-overlay'>
          <div className='order-popup'>
            <h2>Processing your order...</h2>
            <div className='loading-spinner'></div>
          </div>
        </div>
      )}

      {/* Order placed screen */}
      {orderPlaced && (
        <div className='order-overlay'>
          <div className='order-popup'>
            <h2>🎉 Order Placed Successfully!</h2>
            <button onClick={handleGoHome}>Go to Home</button>
          </div>
        </div>
      )}

      {/* CART UI - only show if not processing or placed */}
      {!orderProcessing && !orderPlaced && (
        <>

          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          <hr />

          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} className='carticon-product-icon' alt="" />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>${e.new_price * cartItems[e.id]}</p>
                    <img
                      className='cartitems-remove-icon'
                      src={remove_icon}
                      onClick={() => removeFromCart(e.id)}
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

              <button onClick={handlePlaceOrder}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cartitems-promocode">
              <p>If you have a promo code, enter it here</p>
              <div className="cartitems-promobox">
                <input type='text' placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>

        </>
      )}

    </div>
  );
};

export default CartItems;
