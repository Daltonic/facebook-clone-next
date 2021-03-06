/* eslint-disable @next/next/no-img-element */
import HeaderIcon from './HeaderIcon'
import { useRouter } from 'next/router'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid'
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

function MainHeader() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Facebook Logo"
          width="40"
          height="40"
          loading="lazy"
          className="cursor-pointer"
          // onClick={() => moveTo('/')}
        />
        <div className="hidden md:inline-flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden lg:inline-flex ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon
            active={router.pathname === '/'}
            Icon={HomeIcon}
            navTo={'/'}
          />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon
            active={router.pathname === '/users'}
            Icon={UsersIcon}
            navTo={'/users'}
          />
          <HeaderIcon
            active={router.pathname === '/groups'}
            Icon={UserGroupIcon}
            navTo={'/groups'}
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <img
          src={user?.photoURL}
          alt="avatar"
          width="30"
          height="30"
          loading="lazy"
          title="Username"
          className="icon"
        />
        <p className="hidden lg:inline-flex text-sm whitespace-nowrap font-semibold pr-3">
          {user?.displayName}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </header>
  )
}

export default MainHeader
