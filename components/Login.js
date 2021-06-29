import Image from 'next/image'
import {useRouter} from 'next/router'
import { useState } from 'react'
import { auth, provider } from '../firebase'
import { COMETCHAT_CONSTANTS } from '../app.config'

function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signIn = () => {
    setLoading(true)
    auth
      .signInWithPopup(provider)
      .then((res) => loginCometChat(res.user))
      .catch((error) => {
        setLoading(false)
        // alert(error.message)
        console.log(error.message)
      })
  }

  const loginCometChat = (data) => {
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY

    let appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.APP_REGION).build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {

      CometChat.login(data.uid, authKey)
      .then((u) => {
        console.log(u)
        localStorage.setItem('user', JSON.stringify(data))
        setLoading(false)
        router.reload()
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
    });

    
  }

  const signUpWithCometChat = (data) => {
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY
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
        localStorage.setItem('user', data)
        setLoading(false)
        alert(error.message)
      })
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden grid place-items-center">
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
