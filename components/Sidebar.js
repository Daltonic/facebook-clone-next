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
import { useUser } from '@auth0/nextjs-auth0'

function Sidebar() {
  const { user, error, isLoading } = useUser()

  const moveTo = () => {
    window.location.href = '/api/auth/logout'
  }
  
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      {/* <SidebarRow src={user?.picture} title={user?.name} /> */}
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
      <SidebarRow Icon={LogoutIcon} title="Logout" onClick={moveTo} />
      <button onClick={moveTo}>Logout</button>
    </div>
  )
}

export default Sidebar
