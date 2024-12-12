import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
        <h2 className='text-2xl font-semibold'>Admin</h2>
        <div className='flex gap-4 mt-4'>
          <Link href="/admin-cyklar" className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
            Cyklar
          </Link>
          <Link href="/admin-användare" className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
            Användare
          </Link>
          <Link href="/admin-laddstationer" className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>
            Laddstationer
          </Link>
        </div>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
