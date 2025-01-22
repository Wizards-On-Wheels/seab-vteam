import HamburgerMenu from "../components/HamburgerMenu";

const links = [
    {label: "Börja Åka!", href: "/ride"},
    {label: "Våra Sparkcyklar", href: "/info"},
    {label: "Min Profil", href: "/profile"},
    {label: "Priser Och Åkpass", href: "/price"}
  ]
  export default function Info() {
    return (
      <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
        <HamburgerMenu links={links}>
        </HamburgerMenu>
        <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>

          <h1>Discover the Freedom of the City with Svenska Elsparkcyklar AB</h1>

          <p>Welcome to Svenska Elsparkcyklar AB, where we believe in making urban travel effortless, eco-friendly, and exhilarating. Whether you’re commuting, sightseeing, or just in the mood for a scenic ride, our scooters and bikes are designed to take you further with ease and style.
            At Svenska Elsparkcyklar AB, we prioritize smooth, safe journeys. Each scooter and bike is crafted with cutting-edge technology for a stable ride on any terrain. With top-tier braking systems, sturdy wheels, and an intuitive control panel, our vehicles provide peace of mind and confidence for every rider.
            Sustainability is at the heart of what we do. By choosing Svenska Elsparkcyklar AB, you’re embracing eco-friendly travel powered by renewable energy, making each trip a meaningful step towards a cleaner, greener future. Plus, accessing our fleet couldn’t be easier. Our app is designed to give you seamless control, allowing for quick booking, easy unlocking, and detailed trip tracking, so you can find a scooter or bike whenever you need it.
            Our pricing is designed with fairness and flexibility in mind. You’ll find competitive rates and packages that work for both occasional riders and frequent travelers—no hidden fees or surprises, just honest pricing that fits your lifestyle.
            As a Swedish company, we’re deeply committed to our community. When you ride with Svenska Elsparkcyklar AB, you’re supporting a local business that reinvests in the community, contributing to local jobs and sustainable urban development.
            Whether it’s a daily commute or a spontaneous adventure, Svenska Elsparkcyklar AB is here to make every ride memorable. Explore the city with freedom, sustainability, and the thrill of movement in every trip.</p>
        </main>
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
          A project by Wizards on Wheels
        </footer>
      </div>
    )
}
  