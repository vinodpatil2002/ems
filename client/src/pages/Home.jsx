import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/profile");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Employee Manager
                </h1>
                <button
                    onClick={handleGetStarted}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
