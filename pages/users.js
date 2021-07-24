import dynamic from 'next/dynamic'
import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import Widget from '../components/Widget'
import Head from 'next/head'
import { useEffect } from 'react'
import { COMETCHAT_CONSTANTS } from '../app.config'
const FriendRequests = dynamic(() => import('../components/FriendRequests'), {
  ssr: false,
})

function Users() {
  useEffect(() => {
    window.CometChat = require('@cometchat-pro/chat').CometChat

    let appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.APP_REGION)
      .build()

    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {
      console.log('CometChat Initialized Successfully!')
    })
  }, [])

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook - Friends</title>
      </Head>

      <MainHeader />
      <main className="flex">
        <Sidebar />
        <FriendRequests />
        <Widget />
      </main>
    </div>
  )
}

export default Users
