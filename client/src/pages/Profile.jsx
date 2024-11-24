import React from "react";
import { useSelector } from "react-redux";
import {
    signOutFailure,
    signOutStart,
    signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEmployee = () => {
        navigate("/add-employee");
    };
    const handleViewEmployee = () => {
        navigate("/employees");
    };
    const handleSignout = async () => {
        try {
            dispatch(signOutStart());
            const res = await fetch("/api/user/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            dispatch(signOutSuccess());
        } catch (error) {
            dispatch(signOutFailure(error.message));
        }
    };
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-3 mt-4 mx-auto max-w-lg ">
                <img
                    src={currentUser.avatar}
                    alt="profile-pic"
                    className="self-center rounded-full w-32 h-32 object-cover"
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg"
                    defaultValue={currentUser.username}
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    defaultValue={currentUser.email}
                />
                <button
                    onClick={handleEmployee}
                    className="text-white bg-green-700 p-3 rounded-lg cursor-pointer hover:opacity-90"
                >
                    Add Employee
                </button>
                <button
                    onClick={handleViewEmployee}
                    className="text-white bg-slate-700 p-3 rounded-lg cursor-pointer hover:opacity-90"
                >
                    View Employees
                </button>
                <button
                    onClick={handleSignout}
                    className="text-white bg-red-700 p-3 rounded-lg cursor-pointer hover:opacity-90"
                >
                    Sign Out
                </button>
            </form>
        </div>
    );
};

export default Profile;
