import React from 'react'

export default function HamburgerToggle({active, check, disable}) {
    return (
        <label className="btn btn-circle swap swap-rotate absolute z-20 border-transparent bg-transparent shadow-none hover:bg-transparent hover:border-transparent hover:scale-110 duration-500"
            onChange={active}
            >
            <input className='bg-white'
            type="checkbox" 
            checked={check}
            disabled={disable}
            readOnly
            />
            <svg
                className="swap-off fill-zinc-900 dark:fill-zinc-300"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
                className="swap-on fill-zinc-900 dark:fill-zinc-300"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512">
                <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
        </label>
    )
}
