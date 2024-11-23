import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          setError(null);
          const res = await fetch('api/user/signin',{
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
          navigate('/');
        } catch (error) {
            setError(error.response.data || error.message);
            setLoading(false);
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    className="border p-3 rounded-lg"
                    placeholder="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="border p-3 rounded-lg"
                    placeholder="password"
                    onChange={handleChange}
                />
                <button className="text-white bg-slate-700 hover:opacity-95 rounded-lg p-3 uppercase">
                    Sign In
                </button>
            </form>
            <div className="flex gap-3 mt-3">
                <p>Don't have an account</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
        </div>
    );
};

export default Signin;
