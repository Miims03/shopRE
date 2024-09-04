import React, { useEffect, useRef, useState } from 'react'
import { fetchUserData , fetchAllUsers } from '../services/userService';

export default function Home() {

  // const [savedTheme, setSavedTheme] = useState(null)

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const userData = await fetchAllUsers();
        setUsers(userData);
      } catch (error) {
        setError(error);
      }
    };
    getAllUserData();
  }, []);

  if (error) return <div className='text-xl text-zinc-900 font-semibold mt-20'>Error: {error.message}</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <main className='w-full h-full flex flex-col items-center justify-start text-3xl font-semibold py-10 gap-20'>


      <div className="bg-clip-border bg-gradient-to-r border-transparent rounded-full animate__animated animate__fadeIn slow from-zinc-900 to-[#969290] ">
        <div className='bg-clip-padding h-full w-full bg-zinc-300 border-2 border-transparent flex items-center justify-center rounded-full px-4'>
          <h1 className='bg-gradient-to-r bg-clip-text text-transparent text-lg 
        from-zinc-900 to-[#969290]
        dark:from-zinc-300 dark:to-[#3f3d3c]'>Summer ta mere</h1>
        </div>
      </div>

      <div className=''>
        <h1>Protected Data</h1>
        {users ? <pre className='text-md text-zinc-900 mt-20'>{JSON.stringify(users, null, 2)}</pre> 
        : 
        <p>Loading...</p>}
      </div>

    </main>
  )
}
