import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js";
import path from "path";
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB 🚀");
    })
    .catch((err) => {
        console.log(err);
    });
const __dirname = path.resolve();

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀 `);
});

app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ success: false, message, statusCode });
});
