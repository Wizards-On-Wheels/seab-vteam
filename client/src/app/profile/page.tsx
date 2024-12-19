import HamburgerMenu from "../components/HamburgerMenu";
import UserProfile from "../components/UserProfile";
import RideProfile from "../components/RideInfo";

const links = [
    {label: "Börja Åka!", href: "/"},
    {label: "Våra Sparkcyklar", href: "/info"},
    {label: "Min Profil", href: "/profile"},
    {label: "Priser Och Åkpass", href: "/price"}
  ]

const user = {
    name: "Sixten Snabbsson",
    email: "sixten.Snabbsson@bth.se",
    profileImage: "/images/Profile.svg", 
};

const rideHistory = [
    { title: "Åktur", date: "24/10/06", Price: 24.5},
    { title: "Fri upplåsning", date: "24/09/03", Price: 30 },
    { title: "Ladda saldo", date: "24/08/21", Price: 200 },
];

  
  export default function Info() {

    
    return (
      <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20 profile'>
        <HamburgerMenu links={links}>
        </HamburgerMenu>
        <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        
        <UserProfile user={user} />
        <RideProfile rideHistory={rideHistory}></RideProfile>
        </main>
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
          A project by Wizards on Wheels
        </footer>
      </div>
    )
}
  