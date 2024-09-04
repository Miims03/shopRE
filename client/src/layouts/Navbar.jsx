import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import DrakModeToggle from '../components/DrakModeToggle'
import HamburgerToggle from '../components/HamburgerToggle'
import Logo from '/testt.svg'
import CartLogo from '/cart.svg'
export default function Navbar() {

  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/sale', label: 'Sale' },
    { path: '/blog', label: 'Blog' },
    { path: '/showcase', label: 'Showcase' },
  ]

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <main className='flex justify-center items-center h-[5rem] w-screen'>

      {/* Mobile */}
      {/* <section className='flex lg:hidden w-full h-full'>
        <HamburgerToggle />
      </section> */}

      {/* A partir de md */}
      <section className='lg:flex hidden justify-between w-full h-full py-4 px-10'>

        <div className='bg-red-400 h-full w-[10rem] flex items-center justify-start '>
          <img src={Logo} className='h-[5em] w-[5rem] cursor-pointer duration-300' />
        </div>

        <nav className=' bg-red-400 text-stone-900 dark:text-stone-300 font-semibold flex justify-center items-center gap-2 text-lg p-1 h-full rounded-full bg-stone-800/20 dark:bg-stone-500/20'>
          {links.map(link => (
            <NavLink exact to={link.path} key={link.path}
              className={`py-1 px-5 rounded-l-full rounded-r-full duration-300 min-w-[5rem] h-full flex justify-center items-center pb-1.5
                ${isActive(link.path) ? 'bg-stone-900 text-stone-300 dark:bg-stone-300 dark:text-stone-900' : 'hover:bg-stone-800/20  dark:hover:bg-stone-500/20'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className='h-full w-[10rem] flex items-center justify-end gap-2 bg-red-400'>
          <button className='rounded-full h-[3rem] w-[3rem] border p-2 flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          </button>
          {/* <button className='btn mt-[1.5rem] '>Login</button>
          <button className='btn mt-[1.5rem] '>Sign up</button> */}
        </div>
      </section>

      <DrakModeToggle />
    </main>
  )
}
