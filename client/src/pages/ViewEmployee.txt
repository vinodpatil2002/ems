import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewEmployee = () => {
    const { _id } = useParams(); // Extract _id from the URL params
    const [employee, setEmployee] = useState(null); // State to store employee data
    const [error, setError] = useState(false); // State to handle errors

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // Fetch employee data using the _id from the URL
                const res = await fetch(`/api/employee/get/${_id}`);
                const data = await res.json();
                console.log("API Response:", data); // Log response to debug

                // Check if the response contains employee data
                if (data && data._id) {
                    setEmployee(data); // Set employee data if it's valid
                } else {
                    // If the employee data is not valid, set error state
                    console.error("Employee not found or invalid data");
                    setError(true);
                }
            } catch (err) {
                // Handle any errors during the fetch process
                console.error("Error fetching employee details:", err);
                setError(true);
            }
        };

        fetchEmployee(); // Call the fetchEmployee function
    }, [_id]); // Re-run when _id changes

    // Display error message if there's an error
    if (error) {
        return <p className="text-red-600">Failed to load employee details.</p>;
    }

    // Display loading message if employee data is still being fetched
    if (!employee) {
        return <p className="text-gray-600">Loading employee details...</p>;
    }

    // Display employee details if data is loaded successfully
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-7">Employee Details</h1>
            <form className="flex flex-col gap-3 mt-4 mx-auto max-w-lg ">
                <img
                    src={employee.image}
                    alt="profile-pic"
                    className="self-center rounded-full w-32 h-32 object-cover"
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg text-center"
                    defaultValue={employee.name}
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg text-center"
                    defaultValue={employee.email}
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg text-center"
                    defaultValue={employee.designation}
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg text-center"
                    defaultValue={employee.gender}
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg text-center"
                    defaultValue={employee.course}
                />
            </form>
        </div>
    );
};

export default ViewEmployee;
