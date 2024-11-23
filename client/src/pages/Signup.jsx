import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">
        Signup
      </h1>
      <form  className="flex flex-col gap-4 ">
        <input type="text" className='border p-3 rounded-lg' placeholder='username' id='username' />
        <input type="email" className='border p-3 rounded-lg' placeholder='email' id='email' />
        <input type="password" className='border p-3 rounded-lg' placeholder='password' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className="mt-5 flex gap-2">
        <p className="">Have an account??</p>
        <Link to="/sign-in">
          <span className='text-blue-500 hover:underline'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup