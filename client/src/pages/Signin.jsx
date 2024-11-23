import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Sign In
      </h1>
      <form className='flex flex-col gap-3'>
        <input type="text" className="border p-3 rounded-lg" placeholder='username' />
        <input type="password" className="border p-3 rounded-lg" placeholder='password' />
        <button className='text-white bg-slate-700 hover:opacity-95 rounded-lg p-3 uppercase'>Sign In</button>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Don't have an account</p>
        <Link to="/sign-up">
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default Signin