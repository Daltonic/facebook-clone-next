/* eslint-disable @next/next/no-img-element */
import { COMETCHAT_CONSTANTS } from '../app.config'
import { useState, useEffect } from 'react'

function FriendRequests() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const getUsers = () => {
    const limit = 20
    const usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .build()
    usersRequest
      .fetchNext()
      .then((userList) => setUsers(userList))
      .catch((error) => {
        console.log('User list fetching failed with error:', error)
      })
  }
  const addFriend = (uid) => {
    const url = `https://api-us.cometchat.io/v2.0/users/${user.uid}/friends`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        appId: COMETCHAT_CONSTANTS.APP_ID,
        apiKey: COMETCHAT_CONSTANTS.REST_KEY,
      },
      body: JSON.stringify({ accepted: [uid] }),
    }
    fetch(url, options)
      .then((res) => {
        console.log(res)
        alert('Added as friend successfully')
      })
      .catch((err) => console.error('error:' + err))
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    getUsers()
  }, [])

  return (
    <div className="felx-grow flex-1 h-screen pb-44 pt-6 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        {users.length < 1 ? <p>No Users yet!</p> : ''}
        {users.map((user, index) => (
          <div
            className="
              flex
              justify-between
              bg-white
              p-2
              rounded-2xl
              shadow-md
              text-gray-500
              font-medium
              mt-6
            "
            key={index}
          >
            <a
              href={`/chats/user/${user?.uid}`}
              className="flex items-center space-x-4 p-2"
            >
              <img
                src={user?.avatar || user?.metadata.avatar}
                alt={user?.name}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <p>{user?.name}</p>
            </a>
            <div className="flex items-center space-x-4 p-2">
              <button
                className="
                  bg-blue-500
                  hover:bg-blue-700
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded-full
                  focus:outline-none
                "
                onClick={() => addFriend(user?.uid)}
              >
                Add as Friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendRequests
