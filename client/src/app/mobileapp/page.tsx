"use client"
import HamburgerMenu from "../components/HamburgerMenu"

const links = [
  {label: "Börja Åka!", href: "ride"},
  {label: "Våra Sparkcyklar", href: "info"},
  {label: "Min Profil", href: "profile"},
  {label: "Priser Och Åkpass", href: "price"}
]
export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h1>Svenska Elsparkcyklar AB</h1>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <HamburgerMenu links={links}>
        </HamburgerMenu>
        <h1>This page is really not needed and will be removed soon</h1>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}

