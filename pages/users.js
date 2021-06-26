import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import FriendRequests from '../components/FriendRequests'
import Widget from '../components/Widget'
import Head from 'next/head'

function users() {
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

export default users
