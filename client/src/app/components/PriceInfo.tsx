import React from "react";

type PriceInfoProps = {
  price: {
    title: string;
    unlock: string;
    minutprice: string;
    price: number;
  };
  addToCart: (item: { title: string; price: number }) => void;
};




const PriceInfo: React.FC<PriceInfoProps> = ({ price, addToCart }) => {
  return (
    <div className="my-6 w-[300px]">
      <div className="flex text-xl justify-between items-center">
        <div className="flex items-center">
        <button
          onClick={() => addToCart({ title: price.title, price: price.price })}
          className="text-gray-800 rounded-md"
          aria-label="Add to Cart"
        >
          <img
            className="w-[64px]"
            src="/images/shopping-cart.png"
            alt="Shopping cart icon"
          />
        </button>
        <h2 className=" ">{price.title}</h2>
        </div>
        <h2>{price.price} kr</h2>
      </div>
      <div className="pl-[64px]">
        <p>{price.unlock}</p>
        <p>{price.minutprice}</p>
      </div>
    </div>
  );
};

export default PriceInfo;
