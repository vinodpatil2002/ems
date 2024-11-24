import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employees = () => {
    const navigate = useNavigate();
    const [showEmployeesError, setShowEmployeesError] = useState(false);
    const [employees, setEmployees] = useState(null);

    const showEmployees = async () => {
        try {
            const res = await fetch("/api/employee/get");
            const data = await res.json();
            setEmployees(data.employees);
        } catch (error) {
            setShowEmployeesError(true);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const res = await fetch(`/api/employee/delete/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // Remove the deleted employee from the local state
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee._id !== id)
                );
            } else {
                console.error("Failed to delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center">Employees</h1>
            <div className="
                flex
                justify-center
                gap-4
                my-4
                mx-auto
                max-w-lg
            ">
            <button
                onClick={showEmployees}
                className="bg-blue-500 p-3 cursor-pointer text-white rounded-lg hover:opacity-90"
            >
                Show Employees
            </button>
            <button
                    onClick={
                        () => navigate("/add-employee")
                    }
                    className="text-white bg-green-700 p-3 rounded-lg cursor-pointer hover:opacity-90"
                >
                    Add Employee
                </button>
            </div>
            {showEmployeesError && (
                <p className="text-red-500">Failed to fetch employees.</p>
            )}
            {employees && employees.length > 0 ? (
                employees.map((employee) => (
                    <div
                        key={employee._id}
                        className="flex border rounded-lg p-3 justify-between items-center my-2"
                    >
                        <Link to={`/employee/${employee._id}`}>
                            <img
                                src={employee.image}
                                alt="Employee pic"
                                className="h-16 w-16 object-contain"
                            />
                        </Link>
                        <Link to={`/employee/${employee._id}`}>
                            <p className="text-lg font-semibold text-slate-700 hover:underline truncate">
                                {employee.name}
                            </p>
                        </Link>
                        <p className="text-lg font-semibold text-slate-700">
                            {employee.designation}
                        </p>
                        <p className="text-lg font-semibold text-slate-700">
                            {employee.gender}
                        </p>
                        <p className="text-lg font-semibold text-slate-700">
                            {employee.course.join(", ")}
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to={`/employee/edit/${employee._id}`}
                                className="text-slate-700 hover:underline truncate"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteEmployee(employee._id)}
                                className="text-red-700 hover:underline truncate"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center mt-4">No employees found.</p>
            )}
        </div>
    );
};

export default Employees;
