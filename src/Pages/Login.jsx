import React from 'react'
import { auth, provider } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'

function Login({ setIsAuth }) {
  let navigate = useNavigate()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      navigate('/')
    })
  }
  return (
    <div className='bg-white lbox'>
      <button
        className='bg-[#354259] text-5xl text-white px-20 rounded-2xl py-5 border-2 hover:bg-[#282626]  flex justify-center items-center '
        onClick={signInWithGoogle}
      >
        <FcGoogle className='mr-5' />
        Login
      </button>
    </div>
  )
}

export default Login
