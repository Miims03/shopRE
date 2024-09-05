import 'animate.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './layouts/Navbar'
import Indic from './layouts/Indic'
import Shop from './pages/Shop'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Logout from './components/Logout';


function App() {

  return (
    <main className='
    bg-gradient-to-tr from-[#3f3d3c] via-zinc-300 to-zinc-300 
    dark:from-[#3f3d3c] dark:via-zinc-900 dark:to-zinc-900 h-screen w-screen flex flex-col justify-start items-center'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Indic />
    </main>
  )
}

export default App
