import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import GroupRequests from '../components/GroupRequests'
import Widget from '../components/Widget'

function groups() {
  return (
    <div className="groups">
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
