/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import { cometChatConfig } from '../app.config'

function GroupRequests() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupPrivacy, setGroupPrivacy] = useState('')
  const [groups, setGroups] = useState([])
  const router = useRouter()

  const getGroups = () => {
    let appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(cometChatConfig.APP_REGION).build();
    CometChat.init(cometChatConfig.APP_ID, appSetting).then(() => {

    const limit = 30
    const groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(limit)
      .build()
    groupsRequest
      .fetchNext()
      .then((groupList) => setGroups(groupList))
      .catch((error) => {
        console.log('Groups list fetching failed with error', error)
      })

    })
  }

  const joinGroup = (GUID) => {
    let appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(cometChatConfig.APP_REGION).build();
    CometChat.init(cometChatConfig.APP_ID, appSetting).then(() => {

    const password = ''
    const groupType = CometChat.GROUP_TYPE.PUBLIC
    CometChat.joinGroup(GUID, groupType, password)
      .then((group) => {
        const index = groups.findIndex((g) => g.guid === GUID)
        groups[index] = group
        console.log('Group joined successfully:', group)
        alert('Group joined successfully')
      })
      .catch((error) => {
        console.log('Group joining failed with exception:', error)
        alert(error.message)
      })

    })
  }
  const moveTo = (path) => {
    router.push('/chats/[type]/[id]', path)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (groupName === '' || groupPrivacy === '') return

    setLoading(true)

    let appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(cometChatConfig.APP_REGION).build();
    CometChat.init(cometChatConfig.APP_ID, appSetting).then(() => {

    const GUID = generateGUID()
    const groupType =
      groupPrivacy === 'true'
        ? CometChat.GROUP_TYPE.PRIVATE
        : CometChat.GROUP_TYPE.PUBLIC
    const password = ''
    const Group = new CometChat.Group(GUID, groupName, groupType, password)

    CometChat.createGroup(Group)
      .then((res) => {
        setGroups((prevState) => [res, ...prevState])
        setGroupName('')
        setGroupPrivacy('')
        setLoading(false)
        console.log('Group created successfully:', res)
      })
      .catch((error) => {
        console.log('Group creation failed with exception:', error)
        setLoading(false)
        alert(error.message)
      })

    })
  }
  const generateGUID = (length = 20) => {
    const result = []
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      )
    }
    return result.join('')
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

  useEffect(() => {
    window.CometChat = require("@cometchat-pro/chat").CometChat;
    setUser(JSON.parse(localStorage.getItem('user')))
    getGroups()
  }, [])

  return (
    <div className="felx-grow flex-1 h-screen pb-44 pt-6 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <div
          className="
          bg-white
          p-2
          rounded-2xl
          shadow-md
          text-gray-500
          font-medium
          mt-6
        "
        >
          <div className="flex items-center space-x-4 p-2">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="h-10 w-10 rounded-full object-cover icon"
              loading="lazy"
            />
            <form className="flex flex-1">
              <input
                type="text"
                placeholder="Add a new group"
                className="
                rounded-full
                h-12
                bg-gray-100
                flex-grow
                px-5
                focus:outline-none
              "
              onChange={(e) => setGroupName(e.target.value)}
              />

              <select
                className="
                rounded-full
                h-12
                bg-gray-100
                flex-grow
                px-5
                focus:outline-none
                text-base
                placeholder-gray-600
              "
                placeholder="Select Group Privacy"
                defaultValue={groupPrivacy}
                onChange={(e) => setGroupPrivacy(e.target.value)}
              >
                <option disabled hidden value={groupPrivacy}>
                  Select Group Privacy
                </option>
                <option value="false">Public</option>
                <option value="true">Private</option>
              </select>

              <button
                type="submit"
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
              onClick={(e) => onSubmit(e)}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        </div>
        {groups.map((group, index) => (
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
            {group?.type === 'public' ? (
              <div className="flex items-center space-x-4 p-2">
                <img
                  src={generateImageFromIntial(group?.name)}
                  alt="group?.name"
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <p>{group?.name}</p>
              </div>
            ) : (
              <div className="flex items-center space-x-4 p-2">
                <img
                  src={generateImageFromIntial(group?.name)}
                  alt={group?.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <p>{group?.name}</p>
              </div>
            )}

            {!group?.hasJoined ? (
              <div className="flex items-center space-x-4 p-2">
                {group?.type === 'public' ? (
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
                    onClick={joinGroup(group?.guid)}
                  >
                    Join Group
                  </button>
                ) : (
                  <button
                    className="
                      bg-blue-500
                      text-white
                      font-bold
                      py-2
                      px-4
                      rounded-full
                      italic
                      hover:bg-blue-700
                      focus:outline-none
                      disabled:opacity-50
                    "
                    disabled
                  >
                    Private
                  </button>
                )}
              </div>
            ) : (
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
                  onClick={() => moveTo(`/chats/group/${group?.guid}`)}
                >
                  Enter Group
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupRequests
