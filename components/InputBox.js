/* eslint-disable @next/next/no-img-element */
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useRef, useState, useEffect } from 'react'
import { db, storage, timestamp } from '../firebase'

function InputBox() {
  const inputRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)
  const filepickerRef = useRef(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  

  const sendPost = (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return

    db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        timestamp,
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_changed',
            null,
            (error) => {
              // ERROR function
              console.log(error)
            },
            () => {
              // COMPLETE function
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection('posts').doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  )
                })
            }
          )
        }
      })

    inputRef.current.value = ''
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="h-10 w-10 rounded-full object-cover icon"
          loading="lazy"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`what's on your mind, ${user?.displayName}?`}
            ref={inputRef}
          />
          <button hidden onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain " src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            onChange={addImageToPost}
            ref={filepickerRef}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
