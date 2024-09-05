import React, { useEffect, useRef, useState } from 'react'
import { fetchUserData, fetchAllUsers } from '../services/userService';

export default function Home() {

  // const [savedTheme, setSavedTheme] = useState(null)

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const getAllUserData = async () => {
    //   try {
    //     const userData = await fetchAllUsers();
    //     setUsers(userData);
    //   } catch (error) {
    //     setError(error);
    //   }
    // };
    // getAllUserData();
  }, []);

  if (error) return <div className='text-xl text-zinc-900 font-semibold mt-20'>Error: {error.message}</div>;
  // if (!users) return 

  return (
    <main className='w-full h-full flex flex-col items-center justify-start text-3xl font-semibold py-10 gap-20'>
      <h1 className='text-zinc-900 dark:text-zinc-300'>Home</h1>
      <div className=''>
        {
          users ?
            <div>
              <h1 className='text-zinc-900 dark:text-zinc-300'>Protected Data</h1>
              <pre className='text-md text-zinc-900 mt-20'>{JSON.stringify(users, null, 2)}</pre>
            </div>
            :
            <div className='flex items-end justify-center text-zinc-900 dark:text-zinc-300 text-lg gap-2'>
              <p>Loading</p>
              <span className="loading loading-dots loading-xs mb-0.5"></span>
            </div>
        }
      </div>

    </main>
  )
}
