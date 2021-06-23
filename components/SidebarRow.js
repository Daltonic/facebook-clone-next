/* eslint-disable @next/next/no-img-element */
import {auth} from '../firebase'
function SidebarRow({ src, Icon, title, logout }) {

  const signOut = () => {
    if (!logout) return null
    auth
      .signOut()
      .then(() => {
        localStorage.clear()
        console.log('Logged Out Successfully!')
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div
      className="
      flex
      items-center
      space-x-2
      p-4
      hover:bg-gray-200
      rounded-xl
      cursor-pointer
    "
    onClick={signOut}
    >
      {src && (
        <img
          v-if="img"
          src={src}
          alt={title}
          width="30"
          height="30"
          loading="lazy"
          title={title}
          className="icon"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium capitalize">{title}</p>
    </div>
  )
}

export default SidebarRow
