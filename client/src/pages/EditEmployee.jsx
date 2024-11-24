import React, { useEffect, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
    const navigate = useNavigate();
    const { _id } = useParams(); // Assuming you use dynamic routing for employee ID
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
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);

    // Fetch existing employee details
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/employee/get/${_id}`);
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setFormData(data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch employee details.");
                setLoading(false);
            }
        };
        fetchEmployeeDetails();
    }, [_id]);

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
        const { id, value } = e.target;

        // Handle multi-select inputs like checkboxes
        if (e.target.type === "checkbox") {
            setFormData((prevData) => {
                const updatedCourses = [...prevData.course];
                if (updatedCourses.includes(value)) {
                    return {
                        ...prevData,
                        course: updatedCourses.filter((item) => item !== value),
                    };
                }
                return {
                    ...prevData,
                    course: [...updatedCourses, value],
                };
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    const handleEditEmployee = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/employee/update/${_id}`, {
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
                Edit Employee
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form
                    onSubmit={handleEditEmployee}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <div className="flex flex-col gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-3 rounded-lg"
                            id="name"
                            value={formData.name}
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
                            value={formData.email}
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder="Mobile"
                            className="border p-3 rounded-lg"
                            id="mobile"
                            value={formData.mobile}
                            required
                            onChange={handleChange}
                        />
                        <select
                            name="designation"
                            id="designation"
                            className="border p-3 rounded-lg"
                            required
                            value={formData.designation}
                            onChange={handleChange}
                        >
                            <option value="">Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
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
                                        checked={formData.gender === "M"}
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
                                        checked={formData.gender === "F"}
                                        onChange={handleChange}
                                    />
                                    <span>Female</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 my-4 flex-wrap items-center">
                            <p>Course: </p>
                            <div className="flex gap-3 ">
                                {["MCA", "BCA", "BSC"].map((course) => (
                                    <div className="flex gap-2" key={course}>
                                        <input
                                            type="checkbox"
                                            id="course"
                                            name="course"
                                            value={course}
                                            className="w-5"
                                            checked={formData.course.includes(
                                                course
                                            )}
                                            onChange={handleChange}
                                        />
                                        <span>{course}</span>
                                    </div>
                                ))}
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
                            Update Employee
                        </button>
                    </div>
                </form>
            )}
            <p>{error && <span className="text-red-500">{error}</span>}</p>
        </main>
    );
};

export default EditEmployee;
