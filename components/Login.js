/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../firebase'
import { COMETCHAT_CONSTANTS } from '../app.config'
import { LockClosedIcon } from '@heroicons/react/solid'

function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => loginCometChat(res.user))
      .catch((error) => {
        setLoading(false)
        console.log(error.message)
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    setLoading(true)
    const avatar = generateImageFromIntial(fullname)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: fullname,
            photoURL: avatar,
          })
          .then(() => signUpWithCometChat({ ...res.user, avatar }))
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.message)
      })
  }

  const handleToggle = (e) => {
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  const loginCometChat = (data) => {
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY

    CometChat.login(data.uid, authKey)
      .then((u) => {
        console.log(u)
        localStorage.setItem('user', JSON.stringify(data))
        setLoading(false)
        router.reload()
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        alert(error.message)
      })
  }

  const signUpWithCometChat = (data) => {
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY
    const user = new CometChat.User(data.uid)

    user.setName(data.displayName)
    user.setMetadata({ avatar: data.photoURL })

    CometChat.createUser(user, authKey)
      .then(() => {
        setLoading(false)
        resetForm()

        alert('You are now signed up, proceed to login!')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        alert(error.message)
      })
  }

  const resetForm = () => {
    setIsLogin(true)
    setFullname('')
    setEmail('')
    setPassword('')
  }

  const generateImageFromIntial = (name) => {
    let canvas = document.createElement('canvas')
    canvas.style.display = 'none'
    canvas.width = '32'
    canvas.height = '32'
    document.body.appendChild(canvas)

    let context = canvas.getContext('2d')
    context.fillStyle = '#999'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.font = '16px Arial'
    context.fillStyle = '#ccc'

    if (name && name != '') {
      let initials = name[0]
      context.fillText(initials.toUpperCase(), 10, 23)

      let data = canvas.toDataURL()
      document.body.removeChild(canvas)
      return data
    } else {
      return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <img
          src="https://links.papareact.com/t4i"
          alt="facebook logo"
          height={400}
          width={400}
          className="flex"
        />

        {isLogin ? (
          <form className="space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required=""
                  value={email}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  value={password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium">
                  New to Facebook?
                  <a
                    href="#"
                    onClick={(e) => handleToggle(e)}
                    className="text-blue-600 hover:text-blue-500 mx-2"
                  >
                    SignUp
                  </a>
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={(e) => handleLogin(e)}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="fullname-address"
                  name="fullname"
                  type="text"
                  required=""
                  value={fullname}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Fullname"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required=""
                  value={email}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  value={password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium">
                  Already have an account?
                  <a
                    href="#"
                    onClick={(e) => handleToggle(e)}
                    className="text-blue-600 hover:text-blue-500 mx-2"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={(e) => handleSignUp(e)}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Sign up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
