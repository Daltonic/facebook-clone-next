/* eslint-disable @next/next/no-img-element */
function SidebarRow({ src, Icon, title }) {
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
          onClick="logOut"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium capitalize">{title}</p>
    </div>
  )
}

export default SidebarRow
