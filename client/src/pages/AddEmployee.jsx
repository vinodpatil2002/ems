import React from "react";

const AddEmployee = () => {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Add Employee
            </h1>
            <form action="" className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength={62}
                        minLength={6}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-3 rounded-lg"
                        id="email"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Mobile"
                        className="border p-3 rounded-lg"
                        id="mobile"
                        required
                    />
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="designation"></label>
                            <select
                                name="designation"
                                id="designation"
                                className="border p-3 rounded-lg"
                                required
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
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            id="image"
                            accept="image/*"
                        />
                        <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                            Upload
                        </button>
                    </div>
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
                        Add Employee
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AddEmployee;
