import React, { useEffect } from 'react'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')

  const collectionRef = collection(db, 'posts')
  let navigate = useNavigate()

  const createPost = async () => {
    await addDoc(collectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    })
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/Login')
    }
  }, [])

  return (
    <div className='bg-white flex justify-center items-center md:max-w-[100%]'>
      <div className='bg-gradient-to-b from-gray-700 via-gray-900 to-black flex-col w-2/4 h-full text-2xl sm:text-3xl lg:text-5xl text-center justify-center mt-10 text-white rounded-3xl py-5 min-px-2 sm:px-2 md:px-3 lg:px-4 min-w-[88vw] sm:w-[90vw] md:w-[80vw] lg:w-[50vw]'>
        Create post
        <label className='block mx-5 mt-10 mb-4 text-4xl text-left'>
          Title
        </label>
        <input
          placeholder='enter title for post'
          type='text'
          className='text-black block w-[90%] relative left-4 p-2 text-2xl'
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <label className='block mx-5 mt-10 mb-4 text-4xl text-left'>
          Post:
        </label>
        <textarea
          name='posttext'
          className='text-black block w-[90%] p-2 text-2xl relative left-4'
          rows='5'
          onChange={(event) => {
            setPostText(event.target.value)
          }}
        />
        <button
          onClick={createPost}
          className='bg-white text-black mt-10 relative left-[50%] translate-x-[-50%] block w-[50%] p-2 text-2xl'
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default CreatePost
