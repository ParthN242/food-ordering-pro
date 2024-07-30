import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

const Context = ({ children }) => {
  const [user, setUser] = useState({
    status: "unauthenticated",
    userData: null,
  });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null)
      setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  function addToCart(item) {
    setCart((prev) => [...prev, item]);
  }

  function removeCartItem(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    saveCartIntoStorage(cart);
  }, [cart]);

  function saveCartIntoStorage(items) {
    localStorage.setItem("cart", JSON.stringify(items));
  }
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get("/api/user/me");
        setUser({ status: "authenticated", userData: data.user });
      } catch (error) {}
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        addToCart,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
