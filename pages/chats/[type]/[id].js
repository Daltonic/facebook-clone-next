import MainHeader from '../../../components/MainHeader'
import Sidebar from '../../../components/Sidebar'
// import User from '../../../components/User'
// import Group from '../../../components/Group'
import Widget from '../../../components/Widget'

function chats() {
  return (
    <div className="chats">
      <MainHeader />
      <main className="flex">
        <Sidebar />
        {/* {type === 'user' ? <User uid={id} /> : <Group guid={id} />} */}
        <h4>Hello World</h4>
        <Widget />
      </main>
    </div>
  )
}

export default chats
