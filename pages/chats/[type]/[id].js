import MainHeader from '../../../components/MainHeader'
import Sidebar from '../../../components/Sidebar'
import User from '../../../components/User'
import Group from '../../../components/Group'
import Widget from '../../../components/Widget'

function chats({ type, id }) {
  return (
    <div className="chats">
      <MainHeader />
      <main className="flex">
        <Sidebar />
        {type === 'user' ? <User uid={id} /> : <Group guid={id} />}
        <Widget />
      </main>
    </div>
  )
}

export default chats

export async function getServerSideProps({ query: { type, id } }) {
  return {
    props: { type, id },
  }
}
