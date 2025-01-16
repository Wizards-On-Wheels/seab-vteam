import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <ul className='temporary-links'>
          {/* Temporary hrefs!! */}
          <Link href="/admin">Admin (tillfällig länk)</Link>
          <Link href="/user/login">Logga in (ska flyttas)</Link>
          <Link href="/mobileapp">App (tillfällig länk)</Link>
        </ul>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
