import Image from 'next/image'
import Link from 'next/link'
import Footer from './components/Footer';
import Header from './components/Header';

export default function Home() {
  return (
    // <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
    <div>  
      <Header />
      <main>
        <ul className='temporary-links'>
          {/* Temporary links!! */}
          <Link href="/admin">Admin (tillfällig länk)</Link>
          <Link href="/user/login">Logga in (ska flyttas)</Link>
          <Link href="/mobileapp">App (tillfällig länk)</Link>
        </ul>
      </main>
      <Footer />
    </div>
  )
}
