import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import SidebarRow from './SidebarRow'
import { auth } from '../firebase'

function Sidebar() {
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.clear()
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow src={user?.photoURL} title={user?.displayName} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
      <SidebarRow Icon={LogoutIcon} title="Logout" onClick={logOut} />
    </div>
  )
}

export default Sidebar
