import React from "react";

type PriceInfoProps = {
  price: {
    title: string;
    unlock: string;
    minutprice: string;
    price: number;
  };
};

const PriceInfo: React.FC<PriceInfoProps> = ({ price }) => {
  return (
    <div className="my-6 ">
      <div className="flex text-xl justify-between items-center">
        <img className="w-[64px]" src="/images/shopping-cart.png" alt="Shopping cart icon" />
        <h2 className=" ">{price.title}</h2>
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
