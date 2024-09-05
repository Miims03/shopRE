import React, { useState } from 'react';
import { signupUser } from '../services/userService'; // Assurez-vous que le chemin est correct
import validator from 'validator'; // Pour valider si l'entrée est un email
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Ce champ peut contenir soit l'email soit le username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true);
    setError(null);

    // Vérifier si l'entrée est un email ou un nom d'utilisateur
    const isEmail = validator.isEmail(email);

    try {
      // Envoyer les données de connexion
      const data = await signupUser({
        email: isEmail ? email : null,
        username: username,
        password: password,
        dob: dob,
        firstname: firstname,
        lastname: lastname,
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('token', data.token);

      // Redirection ou autre action après la connexion réussie
      console.log('Register successful!');

    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className='flex flex-col justify-start items-center mt-20 gap-10 h-full w-full '>
      <h1 className='text-zinc-900 text-3xl font-semibold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start items-center   '>
        <div className='flex justify-center items-start gap-2 w-full'>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-zinc-900 font-semibold text-lg">Firstname</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs  text-zinc-900 bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold '
              type="text"
              value={firstname}
              placeholder='Jhoe'
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-zinc-900 font-semibold text-lg">Lastname</span>
            </div>
            <input
              className='input  w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-900 '
              type="text"
              value={lastname}
              placeholder='Doe'
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

        </div>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-zinc-900 font-semibold text-lg">Username</span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-900 '
            type="text"
            placeholder="Miims"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-zinc-900 font-semibold text-lg">Email</span>
          </div>
          <input
            className='input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-900 '
            type="email"
            placeholder="amine.chr2@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-zinc-900 font-semibold text-lg">Date of birth</span>
          </div>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            placeholderText="Date of Birth"
            className="input input-bordered w-full max-w-full bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-800/50"
            dateFormat="dd-MM-yyyy"
          />
        </label>


        <div className='flex justify-center items-start gap-2'>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-zinc-900 font-semibold text-lg">Password</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-900 '
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-zinc-900 font-semibold text-lg">Confirme password</span>
            </div>
            <input
              className='input input-bordered w-full max-w-xs bg-zinc-800/20 placeholder-zinc-800/50 text-base font-semibold text-zinc-900 '
              type="password"
              placeholder="Confirme Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

        </div>
        <button type="submit" disabled={loading} className='w-full btn max-w-full bg-zinc-800/20 placeholder-zinc-900 text-base font-semibold flex justify-center items-center border-none h-[3.5rem] my-10 hover:bg-zinc-800/40' >
          {loading ?
            <div className='flex items-end justify-center text-zinc-900 text-lg gap-2'>
              <p>Loading</p>
              <span class="loading loading-dots loading-xs mb-0.5"></span>
            </div>
            :
            <p className='text-zinc-900 font-semibold text-lg'>Register</p>}
        </button>
        {error && <p className="error text-zinc-900">{error}</p>}
      </form>
    </main>
  );
}
