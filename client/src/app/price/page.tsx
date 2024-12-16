import HamburgerMenu from "../components/HamburgerMenu";
import PriceInfo from "../components/PriceInfo"; // Note the corrected name

const links = [
  { label: "Börja Åka!", href: "/" },
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
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
       
       <div className="flex justify-between">  <HamburgerMenu links={links} /> <img className="h-[60px]" src="/images/scooterriding.png" alt="Our Logo" /> <img className="h-[70px] fixed top-0 right-0" src="/images/shop.png" alt="Shopping Cart" /> </div>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1> Priser och Åkpass</h1>
        {priceInfoArray.map((price, index) => (
          <PriceInfo key={index} price={price} />
        ))}
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
