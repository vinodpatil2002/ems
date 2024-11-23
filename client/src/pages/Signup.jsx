import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({username: '', email: '', password: ''});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    const res = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setError(error.message);
    }
    
  };
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
        <input onChange={handleChange} type="text" placeholder="username" className="border p-3 rounded-lg " id="username" />
        <input onChange={handleChange} type="email" placeholder="Email" className="border p-3 rounded-lg " id="email" />
        <input onChange={handleChange} type="password" placeholder="password" className="border p-3 rounded-lg " id="password" />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an Account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700 hover:underline'>Login</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Signup;
