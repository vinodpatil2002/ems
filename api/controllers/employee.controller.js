import Employee from "../models/employee.model.js";

export const createEmployee = async (req, res) => {
    try {
        const employee = Employee.create(req.body);
        return res.status(201).json(employee);
    } catch (error) {
        console.error(error);
    }
};

export const deleteEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
    }
};

export const updateEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
    }
};

export const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
    }
};

export const getEmployees = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || "";
        const sortField = req.query.sort || "createdAt";
        const sortOrder = req.query.order || "desc";
        const searchCriteria = {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
                { _id: searchTerm.length === 24 ? searchTerm : null },
            ],
        };

        const employees = await Employee.find(searchCriteria)
            .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
            .limit(limit)
            .skip(startIndex);

        const totalEmployees = await Employee.countDocuments(searchCriteria);

        return res.status(200).json({ employees, total: totalEmployees });
    } catch (error) {
        console.error(error);
    }
};