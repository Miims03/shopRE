import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import validator from 'validator'; 
import { useNavigate  } from 'react-router-dom'; // Si vous utilisez react-router-dom


export default function Login() {
  const [loginField, setLoginField] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const isEmail = validator.isEmail(loginField);

    try {

      const data = await loginUser({
        email: isEmail ? loginField : null,
        username: isEmail ? null : loginField,
        password: password
      });

      localStorage.setItem('token', data.token);
      
      console.log('Login successful!');
      setError('Login successful!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
      

    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col justify-start items-center mt-[10rem] gap-16 h-full w-full '>
      <h1 className='text-zinc-900 dark:text-zinc-300 text-3xl font-semibold'>Login</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col justify-start items-center 
      max-w-1/3 '>

        <div className='flex justify-center items-start gap-2 w-full'>
            <input className='input input-bordered w-full h-0 border-none'/>
            <input className='input input-bordered w-full h-0 border-none'/>
        </div>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">
              Email <span className='text-zinc-800/60 dark:text-zinc-400/60'>( or username )</span>
            </span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 text-base font-semibold text-zinc-900 dark:text-zinc-300'
            type="text"
            placeholder=""
            value={loginField}
            required
            onChange={(e) => setLoginField(e.target.value)}
            onInvalid={(e) => {
              e.target.setCustomValidity('Ce champ est obligatoire.');
            }}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Password</span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 text-base font-semibold text-zinc-900 dark:text-zinc-300'
            type="password"
            placeholder=""
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(e) => {
              e.target.setCustomValidity('Veuillez entrer un mot de passe.');
            }}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </label>
        <button type="submit" disabled={loading} className='w-full btn max-w-full bg-zinc-900 dark:bg-zinc-300 text-base font-semibold flex justify-center items-center border-none h-[3.5rem] my-10 hover:bg-zinc-800/50 dark:hover:bg-zinc-400/50 duration-500'>
        {loading ?
            <div className='flex items-end justify-center text-zinc-300 dark:text-zinc-900 text-lg gap-2'>
              <p>Loading</p>
              <span className="loading loading-dots loading-xs mb-0.5"></span>
            </div>
            : 
            <p className='text-zinc-300 dark:text-zinc-900 font-semibold text-xl'>Login</p>}
        </button>
        {error && <p className="error text-zinc-900 dark:text-zinc-300 text-lg font-medium">{error}</p>}
      </form>
    </main>
  );
}
