"use client";

import React from "react";

type ItemsInCart = {
  cartItems: { title: string; price: number; amount: number }[];
  increaseAmount: (index: number) => void;
  decreaseAmount: (index: number) => void;
};

const CartMenu: React.FC<ItemsInCart> = ({ cartItems, increaseAmount, decreaseAmount }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const totalQuantity = cartItems.reduce((total, item) => total + item.amount, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price*item.amount, 0);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div>
      <div className="fixed top-0 right-0 z-50 p-2 max-h-[40px]">
        <button
          onClick={toggleMenu}
          className="text-gray-800 rounded-md"
          aria-label="Toggle Menu"
        >
          <p className=" bg-[#E5674E] text-white rounded-full w-6 fixed top-4 right-4 z-60">{totalQuantity}</p>
          <img
            src="/images/shop.png"
            alt="Cart Icon"
            className="h-20 w-20"
          />
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-full bg-white-800 bg-opacity-80 z-40 flex items-center justify-center">
          <div className="cart-open p-8 shadow-lg w-full h-full text-center pt-[15vh]">
            <h1>Din Order</h1>
            <div className="flex flex-col pt-[5vh] text-center">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((cartItem, index) => (
                  <div
                    className="mt-4 flex gap-20 justify-between items-center"
                    key={index}
                  >
                    <div className="flex flex-col items-start">
                      <h1>{cartItem.title}</h1>
                      <p>{cartItem.price} kr</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => increaseAmount(index)}
                        className="text-lg text-gray-800 hover:text-black"
                      >
                        ▲
                      </button>
                      <p className="text-xl">{cartItem.amount}</p>
                      <button
                        onClick={() => decreaseAmount(index)}
                        className="text-lg text-gray-800 hover:text-black"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))
              )}
              <div>
              {cartItems.length === 0 ? (
                <p></p>
              ) : (
                  <div
                    className="mt-8 "
                  > <div className="flex justify-between">
                    <h2> Total Pris</h2>
                    <p> {totalPrice} kr</p>
                    </div>
                    <div className="flex">
                      <p> ink moms</p>
                    </div>
                   
                  <div className="pt-5">
                  <a
                    href="/mobileapp/ride" 
                    className=" text-xxl menu-open rounded-full pt-3 pb-3 pl-20 pr-20 hover:text-black"
                  >
                    Take my money!
                  </a>
                  </div>
                  </div>
                  
              )}
                  
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartMenu;
