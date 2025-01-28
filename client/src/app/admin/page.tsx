import Link from 'next/link';

export default function Home() {
  return (
    <div
      className='grid min-h-screen grid-rows-[auto_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'
      style={{
        backgroundImage: "url('/images/admin-background.jpg')",
        backgroundSize: 'cover', // Ensures the image covers the entire screen without distortion
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundAttachment: 'fixed', // Keeps the image fixed while scrolling
      }}
    >
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl text-white'>Svenska Elsparkcyklar AB</h1>
        <h2 className='text-2xl font-semibold text-white'>Admin</h2>

        {/* Home Button */}
        <Link href="/">
          <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-yellow-500 py-4 hover:bg-yellow-300 text-white transition-all rounded-lg'>
            <span className='text-3xl'>🏠</span>
            Hem
          </div>
        </Link>

        {/* Other Buttons */}
        <div className='flex gap-4 mt-4'>
          <Link href="/admin/bikes">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-blue-500 py-4 hover:bg-blue-300 text-white transition-all rounded-lg'>
              <span className='text-2xl'>🚲</span>
              Cyklar
            </div>
          </Link>
          <Link href="/admin/users">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-green-500 py-4 hover:bg-green-300 text-white transition-all rounded-lg'>
              <span className='text-2xl'>👤</span>
              Användare
            </div>
          </Link>
          <Link href="/admin/cities">
            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-purple-500 py-4 hover:bg-purple-300 text-white transition-all rounded-lg'>
              <span className='text-2xl'>🏙️</span> {/* Cityscape Icon */}
              Städer
            </div>
          </Link>
        </div>
        {/* Home Button */}
        <Link href="mobileapp/ride">
          <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-red-500 py-4 hover:bg-red-300 text-white transition-all rounded-lg'>
            <span className='text-3xl'>🗺️</span>
            Map
          </div>
        </Link>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6 text-white'>
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
