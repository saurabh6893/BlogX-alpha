import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'

function Home({ isAuth }) {
  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, 'posts')
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  })

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }
  return (
    <div>
      {postList.map((post) => {
        return (
          <div className='page'>
            <div className='aPost border-8 rounded-lg sm:w-[80vw] md:w-[70vw] lg:w-[50vw] mt-7 px-10 py-5'>
              <div className='top flex justify-between items-center'>
                <h1 className='text-5xl m-4 pb-4 border-b-4 capitalize'>
                  {post.title}
                </h1>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id)
                    }}
                    className='del'
                  >
                    &#128465;
                  </button>
                )}
              </div>
              <p className='text-2xl m-4'>{post.postText}</p>
              <p className='m-4 hover:font-bold hover:tracking-wide transition-all'>
                @{post.author.name}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
