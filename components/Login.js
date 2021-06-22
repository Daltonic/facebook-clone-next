import Image from 'next/image'
import { useState } from 'react'
import { auth, provider } from '../firebase'
import { cometChat } from '../app.config'
import { CometChat } from '@cometchat-pro/chat'

function Login() {
  const [loading, setLoading] = useState(false)

  const signIn = () => {
    setLoading(true)
    auth
      .signInWithPopup(provider)
      .then((res) => loginCometChat(res.user))
    //   .then((res) => console.log(res.user))
      .catch((error) => {
        setLoading(false)
        alert(error.message)
      })
  }

  const loginCometChat = (data) => {
    const authKey = cometChat.AUTH_KEY

    CometChat.login(data.uid, authKey)
      .then((u) => {
        console.log(u)
        setLoading(false)
      })
      .catch((error) => {
        if (error.code === 'ERR_UID_NOT_FOUND') {
          signUpWithCometChat(data)
        } else {
          console.log(error)
          setLoading(false)
          alert(error.message)
        }
      })
  }

  const signUpWithCometChat = (data) => {
    const authKey = cometChat.AUTH_KEY
    const user = new CometChat.User(data.uid)

    user.setName(data.displayName)
    user.setAvatar(data.photoURL)

    CometChat.createUser(user, authKey)
      .then(() => {
        setLoading(false)
        alert('You are now signed up, click the button again to login')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        alert(error.message)
      })
  }

  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        alt="facebook logo"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1
        className="p-5 bg-blue-500 rounded-full text-white text-center w-1/6 cursor-pointer"
        onClick={signIn}
      >
        Sign In
      </h1>
    </div>
  )
}

export default Login
