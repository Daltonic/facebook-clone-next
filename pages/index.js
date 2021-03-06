/* eslint-disable @next/next/no-html-link-for-pages */
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { COMETCHAT_CONSTANTS } from '../app.config'

import Feed from '../components/Feed'
import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import Widget from '../components/Widget'
const Login = dynamic(() => import('../components/Login'), { ssr: false })
import { db } from '../firebase'

export default function Home({ posts }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    window.CometChat = require('@cometchat-pro/chat').CometChat

    let appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.APP_REGION)
      .build()

    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {
      if (!!localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')))
      }
      console.log('CometChat Initialized Successfully!')
    })
  }, [])

  if (!user) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <MainHeader />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widget />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const posts = await db.collection('posts').orderBy('timestamp', 'desc').get()

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }))

  return {
    props: { posts: docs },
  }
}
