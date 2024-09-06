import React, { useState } from 'react';
import { signupUser } from '../services/userService'; 
import validator from 'validator'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (confirmPassword !== password) {
      setError('Passwords do not match.');
      setLoading(false);
      return
    }

    const isEmail = validator.isEmail(email);

    try {
      const data = await signupUser({
        email: isEmail ? email : null,
        username: username,
        password: password,
        dob: dob,
        firstname: firstname,
        lastname: lastname,
      });

      localStorage.setItem('token', data.token);

      console.log('Register successful!');

    } catch (err) {

      if (err.response) {
        setError(err.response.data || 'An error occurred.');
      } else if (err.request) {
        setError('No response from the server.');
      } else {
        setError('Request failed.');
      }
      console.error('Error details:', err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col justify-start items-center mt-[5rem] gap-10 h-full w-full  '>
      <h1 className='text-zinc-900 dark:text-zinc-300 text-3xl font-semibold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start items-center max-w-1/3 '>
        <div className='flex justify-center items-start gap-2 w-full'>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-zinc-900  dark:text-zinc-300 font-semibold text-lg">Firstname</span>
            </div>
            <input
              className='input input-bordered w-full  text-zinc-900  dark:text-zinc-300 bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold '
              type="text"
              value={firstname}
              placeholder='Jhoe'

              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Lastname</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900  dark:text-zinc-300'
              type="text"
              value={lastname}
              placeholder='Doe'

              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Username</span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900 dark:text-zinc-300'
            type="text"
            placeholder="Miims"
            value={username}

            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Email</span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900 dark:text-zinc-300 '
            type="email"
            placeholder="amine.chr2@gmail.com"
            value={email}

            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Date of birth</span>
          </div>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            placeholderText="Date of Birth"
            className="input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900 dark:text-zinc-300 z-0"
            dateFormat="dd-MM-yyyy"
          />
        </label>


        <div className='flex justify-center items-start gap-2 w-full'>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Password</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900 dark:text-zinc-300'
              type="password"
              placeholder="***********"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-zinc-900 dark:text-zinc-300 font-semibold text-lg">Confirme password</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 dark:placeholder-zinc-400/50 text-base font-semibold text-zinc-900 dark:text-zinc-300'
              type="password"
              placeholder="***********"
              value={confirmPassword}

              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

        </div>
        <button type="submit" disabled={loading} className='w-full btn max-w-full bg-zinc-900 dark:bg-zinc-300 text-base font-semibold flex justify-center items-center border-none h-[3.5rem] my-10 hover:bg-zinc-800/40 dark:hover:bg-zinc-400/50 duration-300'>
          {loading ?
            <div className='flex items-end justify-center text-zinc-300 dark:text-zinc-900 text-lg gap-2'>
              <p>Loading</p>
              <span className="loading loading-dots loading-xs mb-0.5"></span>
            </div>
            :
            <p className='text-zinc-300 dark:text-zinc-900 font-semibold text-lg'>Register</p>}
        </button>
        {error && <p className="error text-zinc-900 dark:text-zinc-300 text-lg font-medium">{error}</p>}
      </form>
    </main>
  );
}
