import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product'
import { useState } from "react";

export const ShopContext = createContext(null);

   const getDefaultCart = () => {
        let cart = {};
        for (let index = 0; index < all_product.length+1; index++){
            cart[index] = 0;
        }
        return cart;
    }

const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());

    // CLEAR CART
    const clearCart = () => {
     const emptyCart = {};
      // fill keys with 0 (so products don't break)
      for (let i = 0; i < all_product.length; i++) {
        emptyCart[all_product[i].id] = 0;
     }
     setCartItems(emptyCart);
};

    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

     const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
               let itemInfo = all_product.find((product)=>product.id===Number(item));
               totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {clearCart,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;