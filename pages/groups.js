import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import GroupRequests from '../components/GroupRequests'
import Widget from '../components/Widget'
import Head from 'next/head'

function groups() {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden"> 
      <Head>
        <title>Facebook - Groups</title>
      </Head>

      <MainHeader />
      <main className="flex">
        <Sidebar />
        <GroupRequests />
        <Widget />
      </main>
    </div>
  )
}

export default groups
