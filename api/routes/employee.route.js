import expess from "express";
import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/create", createEmployee);
router.delete("/delete/:id", deleteEmployee);
router.post("/update/:id", updateEmployee);
router.get("/get", getEmployees);
router.get("/get/:id", getEmployee);

export default router;
