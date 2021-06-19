/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'

function login() {
  return (
    <div>
      <Head>
        <title>Facebook Clone - Login</title>
      </Head>

      <main className="login grid place-items-center p-10">
        <Image src="/logo.png" alt="Facebook Logo" height={200} width={200} objectFit="contain" />
        <div className="flex items-center">
          <button
            className="
                my-5
                p-5 bg-blue-600 rounded-full text-white text-center cursor-pointer"
            // @click="signIn"
          >
            {/* { !loading ? "Sign In With Google" : "Signing..." } */}
            Sign In With Google
          </button>
        </div>
      </main>
    </div>
  )
}

export default login
