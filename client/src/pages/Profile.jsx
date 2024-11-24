import React from "react";
import { useSelector } from "react-redux";
import {
    signOutFailure,
    signOutStart,
    signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
                    value={currentUser.username}
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    value={currentUser.email}
                />
                <span
                    onClick={handleSignout}
                    className="text-red-700 cursor-pointer hover:underline"
                >
                    Sign Out
                </span>
            </form>
        </div>
    );
};

export default Profile;
