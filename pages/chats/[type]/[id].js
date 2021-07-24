import dynamic from 'next/dynamic'
import MainHeader from '../../../components/MainHeader'
import Sidebar from '../../../components/Sidebar'
import Widget from '../../../components/Widget'
import Head from 'next/head'
import { useEffect } from 'react'
import { COMETCHAT_CONSTANTS } from '../../../app.config'
const User = dynamic(() => import('../../../components/User'), {
  ssr: false,
})
const Group = dynamic(() => import('../../../components/Group'), {
  ssr: false,
})

function Chats({ type, id }) {
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
        <title>Facebook - Chats</title>
      </Head>

      <MainHeader />
      <main className="flex">
        <Sidebar />
        {type === 'user' ? <User uid={id} /> : <Group guid={id} />}
        <Widget />
      </main>
    </div>
  )
}

export default Chats

export async function getServerSideProps({ query: { type, id } }) {
  return {
    props: { type, id },
  }
}
