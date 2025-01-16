"use client";
import { useState } from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import PriceInfo from "../components/PriceInfo"; 
import CartMenu from "../components/Payment";

const links = [
  { label: "Börja Åka!", href: "/ride" },
  { label: "Våra Sparkcyklar", href: "/info" },
  { label: "Min Profil", href: "/profile" },
  { label: "Priser Och Åkpass", href: "/price" },
];

const priceInfoArray = [
  { title: "Fri upplåsning", unlock: "0kr/upplåsning", price: 24.5, minutprice: "2.5 kr/minut" },
  { title: "Fast pris 10kr/tur", unlock: "0kr/upplåsning", price: 100, minutprice: "10 kr/Tur" },
  { title: "Dagspass 30", unlock: "0kr/upplåsning", price: 40, minutprice: "30 minuter ingår" },
  { title: "Dagspass 100", unlock: "0kr/upplåsning", price: 70, minutprice: "100 minuter ingår" },
  { title: "Ladda saldo", unlock: "Lägg till pengar i appen för att få 2 fria upplåsningar", price: 200, minutprice: "" },
  { title: "Ladda saldo ++", unlock: "Lägg till pengar i appen för att få 10 fria upplåsningar", price: 500, minutprice: "" },
];

export default function Info() {
  const [cart, setCart] = useState<{ title: string; price: number; amount: number }[]>([]);

  const addToCart = (item: { title: string; price: number }) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.title === item.title);
      if (existingItem) {
        return prev.map((i) =>
          i.title === item.title ? { ...i, amount: i.amount + 1 } : i
        );
      }
      return [...prev, { ...item, amount: 1 }];
    });
  };

  // Functions to increase or decrease the item amount in the cart
  const increaseAmount = (index: number) => {
    setCart((prev) =>
      prev.map((cartItem, i) =>
        i === index ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
      )
    );
  };

  const decreaseAmount = (index: number) => {
    setCart((prev) =>
      prev.map((cartItem, i) =>
        i === index && cartItem.amount > 0
          ? { ...cartItem, amount: cartItem.amount - 1 }
          : cartItem
      )
    );
  };

  return (
    <div className="grid min-h-screen items-center justify-items-center pt-16 pb-15 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="flex justify-between">
        <HamburgerMenu links={links} />
        <img className="h-[60px]" src="/images/scooterriding.png" alt="Our Logo" />
        <CartMenu cartItems={cart} increaseAmount={increaseAmount} decreaseAmount={decreaseAmount} /> {/* Pass functions to CartMenu */}
      </div>
      <main className="row-start-2 flex flex-col items-center sm:items-start">
        <h1>Priser och Åkpass</h1>
        {priceInfoArray.map((price, index) => (
          <PriceInfo key={index} price={price} addToCart={addToCart} />
        ))}
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
