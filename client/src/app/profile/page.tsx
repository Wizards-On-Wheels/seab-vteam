"use client"
import HamburgerMenu from "../components/HamburgerMenu";
import UserProfile from "../components/UserProfile";
import RideProfile from "../components/RideInfo";
import { useEffect, useState } from "react";

const links = [
    {label: "Börja Åka!", href: "/ride"},
    {label: "Våra Sparkcyklar", href: "/info"},
    {label: "Min Profil", href: "/profile"},
    {label: "Priser Och Åkpass", href: "/price"}
  ]

// const user = {
//     name: "Sixten Snabbsson",
//     email: "sixten.Snabbsson@bth.se",
//     profileImage: "/images/Profile.svg", 
// };

const rideHistory = [
    { title: "Åktur", date: "24/10/06", Price: 24.5},
    { title: "Fri upplåsning", date: "24/09/03", Price: 30 },
    { title: "Ladda saldo", date: "24/08/21", Price: 200 },
];

  
  export default function Info() {
    const [user, setUser] = useState<UserProps["user"]>([])
    const [loading, setLoading] = useState(true)
    const email = "test@test.se"; 

    useEffect (() => {
      const fetchProfileInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/details?email=${encodeURIComponent(email)}`);
          const data = await response.json()
          setUser(data)
        } catch (error) {
          console.log("error fetching for some reason", error)
        } finally {
          setLoading(false)
        }
      }

      fetchProfileInfo()
    }, [])
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
  

// const fetchUserData = async (email: string) => {
//   try {
//     const userDetailsUrl = `http://localhost:8080/user/details?email=${encodeURIComponent(email)}`;
//     const rideHistoryUrl = `http://localhost:8080/user/ride-history?email=${encodeURIComponent(email)}`;
    
//     // Fetch both APIs simultaneously
//     const [userResponse, rideHistoryResponse] = await Promise.all([
//       fetch(userDetailsUrl),
//       fetch(rideHistoryUrl),
//     ]);

//     // Check if both responses are OK
//     if (!userResponse.ok || !rideHistoryResponse.ok) {
//       throw new Error(`Error fetching data: ${userResponse.status}, ${rideHistoryResponse.status}`);
//     }

//     // Parse JSON responses
//     const userDetails = await userResponse.json();
//     const rideHistory = await rideHistoryResponse.json();

//     // Return both results
//     return { userDetails, rideHistory };
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//     throw error; // Optionally rethrow the error
//   }
// };

// // Usage Example in a Component
// useEffect(() => {
//   const email = "sixten.Snabbsson@bth.se";

//   fetchUserData(email).then(({ userDetails, rideHistory }) => {
//     console.log("User Details:", userDetails);
//     console.log("Ride History:", rideHistory);
//   });
// }, []);
