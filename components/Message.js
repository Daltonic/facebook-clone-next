/* eslint-disable @next/next/no-img-element */

function Message({ name, avatar, timestamp, message, isRight }) {
  return (
    <div className="mb-4">
      {isRight ? (
        <div className="flex items-end justify-start">
          <img
            className="
              h-10
              w-10
              rounded-full
              object-cover
              xl:inline-flex
              p-2
              h-10
              w-10
              bg-gray-200
              rounded-full
              text-gray-700
              cursor-pointer
              hover:bg-gray-300
            "
            loading="lazy"
            src={avatar}
            alt={name}
          />
          <div className="w-2/4 bg-white p-5 rounded-r-2xl rounded-t-2xl ml-2">
            <p>{message}</p>
            <small className="font-medium">
              {new Date(1000 * timestamp).toLocaleString()}
            </small>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-end">
          <div className="w-2/4 bg-blue-100 p-5 rounded-l-2xl rounded-t-2xl mr-2">
            <p>{message}</p>
            <small className="font-medium">
              {new Date(1000 * timestamp).toLocaleString()}
            </small>
          </div>
          <img
            className="
              h-10
              w-10
              rounded-full
              object-cover
              xl:inline-flex
              p-2
              h-10
              w-10
              bg-gray-200
              rounded-full
              text-gray-700
              cursor-pointer
              hover:bg-gray-300
            "
            loading="lazy"
            src={avatar}
            alt={name}
          />
        </div>
      )}
    </div>
  )
}

export default Message
