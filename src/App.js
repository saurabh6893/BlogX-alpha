import './input.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Createpost from './Pages/CreatePost'
import { signOut } from 'firebase/auth'
import { auth } from '../src/firebase'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/Login'
    })
  }

  return (
    <Router>
      <nav className='flex bg-[#354259] h-20 text-white justify-between items-center p-10 text-2xl'>
        <Link className='m-4' to='/'>
          Home
        </Link>

        {!isAuth ? (
          <Link className='m-4' to='/Login'>
            Login
          </Link>
        ) : (
          <>
            <Link className='m-4' to='/createpost' isAuth={isAuth}>
              CreatePost
            </Link>
            <button onClick={signUserOut}>SignOut</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/Login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/createpost' element={<Createpost isAuth={isAuth} />} />
      </Routes>
    </Router>
  )
}

export default App
