import React, { useState , useRef } from 'react'
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

  const [mobileMenu, setMobileMenu] = useState(false)

  const [isChecked, setIsChecked] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const AnimeMobileToggle = useRef(null);


  const toggleMobileMenu = () => {
    if (!mobileMenu){
      setMobileMenu(!mobileMenu)
      setIsChecked(true)
    }
    if (mobileMenu){
      AnimeMobileToggle.current.classList.add('animate__slideOutLeft')
      setIsDisabled(true)
      setTimeout(() => {
        setIsDisabled(false)
        setMobileMenu(!mobileMenu)
      }, 450);
      setIsChecked(false)
    }
  }

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <main className='flex justify-center items-center h-[5rem] w-screen'>

      {/* Mobile */}

      <section className='flex lg:hidden w-full h-full relative p-4 '>
        <HamburgerToggle active={toggleMobileMenu} check={isChecked} disable={isDisabled} />
        {mobileMenu && (
          <div ref={AnimeMobileToggle} className={`bg-transparent w-screen h-screen animate__animated ${mobileMenu ? 'animate__slideInLeft' : ''}  animate__faster absolute top-0 left-0 pt-2 flex items-center justify-center 
          bg-zinc-300
          dark:bg-zinc-900/80`}>
            <nav className='flex flex-col justify-center items-center gap-3 text-xl
            text-zinc-900 
            dark:text-zinc-300'>

              {links.map(link => (
                <NavLink exact to={link.path} key={link.path}
                  onClick={toggleMobileMenu}
                  className={`py-1 px-5 rounded-l-full rounded-r-full duration-300 min-w-[10rem] h-full flex justify-center items-center pb-1.5 
                ${isActive(link.path)
                      ? 'bg-zinc-900 text-zinc-300 dark:bg-zinc-300 dark:text-zinc-900'
                      : 'hover:bg-zinc-800/20  dark:hover:bg-zinc-500/20'}`}>
                  {link.label}
                </NavLink>
              ))}

            </nav>
          </div>
        )}
      </section>


      {/* A partir de md */}
      <section className='lg:flex hidden justify-between w-full h-full py-4 px-2 xl:px-20 mt-2'>

        <div className=' h-full w-[20rem] flex items-center justify-start '>
          <NavLink to='/'>
          <img src={Logo} className='h-[5em] w-[5rem] cursor-pointer duration-300 hover:scale-105' />
          </NavLink>
        </div>

        <nav className='font-semibold flex justify-center items-center gap-2 text-lg p-1 h-full rounded-full 
        dark:bg-zinc-700/20 dark:text-zinc-300
        bg-zinc-800/20 text-zinc-900 '>

          {links.map(link => (
            <NavLink exact to={link.path} key={link.path}
              className={`py-1 px-5 rounded-l-full rounded-r-full duration-500 min-w-[5rem] h-full flex justify-center items-center pb-1.5
                ${isActive(link.path)
                  ? 'bg-zinc-900 text-zinc-300 dark:bg-zinc-300 dark:text-zinc-900'
                  : 'hover:bg-zinc-800/20  dark:hover:bg-zinc-500/20'}`}>
              {link.label}
            </NavLink>
          ))}

        </nav>

        <div className='h-full w-[20rem] flex  items-center justify-end gap-1 '>
          <button className='rounded-full h-[3rem] w-[3rem] flex items-center justify-center border-1 border-transparent duration-500 
          dark:bg-zinc-700/20 dark:text-zinc-300 dark:hover:bg-zinc-500/40
          bg-zinc-800/20 text-zinc-900  hover:bg-zinc-800/40'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-zinc-900 dark:stroke-zinc-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

          </button>
          <NavLink to="/login" className='text-lg font-semibold min-w-[5rem] h-full py-1 px-5 rounded-l-full rounded-r-full border-1 duration-500 flex justify-center items-center
          dark:bg-zinc-700/20 dark:text-zinc-300 dark:hover:bg-zinc-500/40
          bg-zinc-800/20 text-zinc-900 border-transparent hover:bg-zinc-800/40'>
            Login
          </NavLink>
          <NavLink to="/signup" className='text-lg font-semibold min-w-[5rem] h-full py-1 px-5 rounded-l-full rounded-r-full border-1 duration-500 flex justify-center items-center
          dark:bg-zinc-300 dark:text-zinc-900 dark:hover:border-zinc-300 dark:hover:text-zinc-300 dark:hover:bg-zinc-900
          text-zinc-300 bg-zinc-900 border-zinc-900 hover:bg-transparent hover:text-zinc-900 hover:border-zinc-900'>
            Sign up
          </NavLink>
        </div>
      </section>

      <DrakModeToggle />
    </main>
  )
}
