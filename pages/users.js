import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import FriendRequests from '../components/FriendRequests'
import Widget from '../components/Widget'

function users() {
  return (
    <div className="friends">
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
