import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <ul className='temporary-links'>
          {/* Temporary hrefs!! */}
          <Link href="/admin">Admin</Link>
          <Link href="/user-webapp">User web app</Link>
          <Link href="/ride">User mobile app</Link>
        </ul>

        <form className='future-login-form'>
          <h2>Future login form...</h2>
            <label htmlFor='username'></label>
              <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  //value={username}
                  //onChange={(e) => {setUsername(e.target.value)}}
                  required
              />
            <label htmlFor='password'></label>
              <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  //onChange={(e) => {setPassword(e.target.value)}}
                  required
              />
          <input type="submit" value="Sign in" />
        </form>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
