import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
        <h2 className='text-2xl font-semibold'>Admin</h2>
        <div className='flex gap-4 mt-4'>
          <Link href="/admin/bikes">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 border-solid border-2 border-blue-500 py-4 hover:bg-blue-100 transition-colors'>
              <span className='text-2xl'>🚲</span> {/* Optional Icon */}
              Cyklar
            </div>
          </Link>
          <Link href="/admin/users">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 border-solid border-2 border-green-500 py-4 hover:bg-green-100 transition-colors'>
              <span className='text-2xl'>👤</span> {/* Optional Icon */}
              Användare
            </div>
          </Link>
          <Link href="/admin/cities">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 border-solid border-2 border-purple-500 py-4 hover:bg-purple-100 transition-colors'>
              <span className='text-2xl'>⚡</span> {/* Optional Icon */}
              Städer
            </div>
          </Link>
        </div>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
