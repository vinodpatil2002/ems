import React, { useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        image: "",
    });
    // console.log(file);
    console.log(formData);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };
    const handleImageSubmit = () => {
        const promise = storeImage(file);
        setUploading(true);
        setImageUploadError(false);
        promise
            .then((url) => {
                setFormData({
                    ...formData,
                    image: url,
                });
                setImageUploadError(false);
                setUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setImageUploadError("Image Upload Failed 2mb max");
                setUploading(false);
            });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res = await fetch("/api/employee/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            }
            console.log(data);
            setLoading(false);
            navigate(`/employees`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Add Employee
            </h1>
            <form
                onSubmit={handleAddEmployee}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength={62}
                        minLength={6}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-3 rounded-lg"
                        id="email"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Mobile"
                        className="border p-3 rounded-lg"
                        id="mobile"
                        required
                        onChange={handleChange}
                    />
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="designation"></label>
                            <select
                                name="designation"
                                id="designation"
                                className="border p-3 rounded-lg"
                                required
                                onChange={handleChange}
                            >
                                <option value="">Designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 my-4">
                            <p>Gender: </p>
                            <div className="flex gap-3 ">
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="gender"
                                        name="gender"
                                        value={"M"}
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                    <span>Male</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="gender"
                                        name="gender"
                                        value={"F"}
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                    <span>Female</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 my-4 flex-wrap items-center">
                            <p>Course: </p>
                            <div className="flex gap-3 ">
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="course"
                                        name="course"
                                        value={"MCA"}
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                    <span>MCA</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="course"
                                        name="course"
                                        value={"BCA"}
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                    <span>BCA</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="course"
                                        name="course"
                                        value={"BSC"}
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                    <span>BSC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold ">Image Upload</p>
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            id="image"
                            accept="image/*"
                        />
                        <button
                            disabled={uploading}
                            type="button"
                            onClick={handleImageSubmit}
                            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p>
                        {imageUploadError && (
                            <span className="text-red-500">
                                {imageUploadError}
                            </span>
                        )}
                    </p>
                    {formData.image && (
                        <div className="flex justify-between p-3 border border-gray-300 rounded-lg items-center ">
                            <img
                                src={formData.image}
                                alt="Employee"
                                className="w-20 h-20 object-contain rounded-lg"
                            />
                            <button
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        image: "",
                                    });
                                }}
                                className="p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-90"
                                type="button"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
                        Add Employee
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AddEmployee;
