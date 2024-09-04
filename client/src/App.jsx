import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './layouts/Navbar'
import Indic from './layouts/Indic'
function App() {

  return (
    <main className='
    bg-gradient-to-tr from-[#3f3d3c] via-stone-300 to-stone-300 
    dark:from-[#3f3d3c] dark:via-stone-900 dark:to-stone-900 h-screen w-screen flex flex-col justify-start items-center'>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Indic />

    </main>
  )
}

export default App
