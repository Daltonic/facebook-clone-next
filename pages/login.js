/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'

function login() {
  return (
    <div>
      <Head>
        <title>Facebook Clone - Login</title>
      </Head>

      <main className="login grid place-items-center p-10">
        <div className="flex items-center">
          <a
            href="http://localhost:3000/api/auth/login"
            className="
                my-5
                p-5 bg-blue-600 rounded-full text-white text-center cursor-pointer"
          >
            Sign In
          </a>
        </div>
      </main>
    </div>
  )
}

export default login
