import { useState, useEffect } from 'react'
import { CometChat } from '@cometchat-pro/chat'
import Message from './Message.vue'

function Group({ guid }) {
  const [user, setUser] = useState(null)
  const [group, setGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getGroup(guid)
    getMessages(guid)
    listenForMessage(guid)

    setUser(JSON.parse(localStorage.getItem('user')))
  }, [guid])

  onUpdated(() => scrollToEnd())

  const listenForMessage = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
          scrollToEnd()
        },
      })
    )
  }

  const getMessages = (guid) => {
    const limit = 50
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setLimit(limit)
      .setGUID(guid)
      .build()
    messagesRequest
      .fetchPrevious()
      .then((msgs) => {
        setMessages(
          msgs.filter((m) => m.type === 'text' && typeof m.text != 'undefined')
        )
        scrollToEnd()
      })
      .catch((error) =>
        console.log('Message fetching failed with error:', error)
      )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendMessage(guid, message)
  }

  const sendMessage = (guid, message) => {
    const receiverID = guid
    const messageText = message
    const receiverType = CometChat.RECEIVER_TYPE.GROUP
    const textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    )

    CometChat.sendMessage(textMessage)
      .then((message) => {
        setMessages((prevState) => [...prevState, message])
        setMessage('')
        scrollToEnd()
      })
      .catch((error) =>
        console.log('Message sending failed with error:', error)
      )
  }

  const getGroup = (guid) => {
    CometChat.getGroup(guid)
      .then((g) => setGroup(g))
      .catch((error) => {
        console.log('User details fetching failed with error:', error)
      })
  }

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <div className="felx-grow flex-1 h-screen pb-44 pt-6">
      <div
        id="messages"
        className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl overflow-y-auto overflow-x-hidden"
      >
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <Message
              name={
                msg?.receiverId !== group?.guid ? group?.name : msg.sender.name
              }
              avatar={
                msg?.receiverId !== group?.guid
                  ? group?.avatar
                  : msg.sender.avatar
              }
              message={msg.text}
              timestamp={msg.sentAt}
              isRight={msg?.sender?.uid !== user?.uid.toLowerCase()}
            />
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <form className="relative flex">
          <input
            type="text"
            className="
            w-full
            focus:outline-none
            focus:placeholder-gray-400
            text-gray-600
            placeholder-gray-600
            pl-12
            bg-gray-200
            rounded-full
            py-3
          "
            placeholder={`Message ${group?.name.toLowerCase()}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="submit"
              className="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-12
              w-12
              transition
              duration-500
              ease-in-out
              text-white
              bg-blue-500
              hover:bg-blue-400
              focus:outline-none
            "
              onClick={(e) => onSubmit(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Group
