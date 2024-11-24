import React, { useState } from "react";
import { Link } from "react-router-dom";

const Employees = () => {
    const [showEmployeesError, setShowEmployeesError] = useState(false);
    const [employees, setEmployees] = useState(null);
    const showEmployees = async () => {
        try {
            const res = await fetch("/api/employee/get");
            const data = await res.json();
            console.log(data);
            setEmployees(data.employees);
        } catch (error) {
            setShowEmployeesError(true);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center">Employees</h1>
            <button onClick={showEmployees}>Show Employees</button>
            {employees &&
                employees.length > 0 &&
                employees.map((employee) => (
                    <div
                        key={employee._id}
                        className="flex border rounded-lg p-3 justify-between items-center"
                    >
                        <Link to={`/employees/${employee._id}`}>
                            <img
                                src={employee.image}
                                alt="Employee pic"
                                className="h-16 w-16 object-contain "
                            />
                        </Link>
                        <Link to={`/employees/${employee._id}`}>
                            <p className="text-lg font-semibold text-slate-700 hover:underline truncate ">
                                {employee.name}
                            </p>
                        </Link>
                        <p className="text-lg font-semibold text-slate-700 ">
                            {employee.designation}
                        </p>
                        <p className="text-lg font-semibold text-slate-700 ">
                            {employee.gender}
                        </p>
                        <p className="text-lg font-semibold text-slate-700">
                            {employee.course}
                        </p>
                        <div className=" flex gap-4">
                          <Link className="text-slate-700 hover:underline truncate">Edit</Link>
                          <button className="text-red-700 hover:underline truncate">Delete</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Employees;
