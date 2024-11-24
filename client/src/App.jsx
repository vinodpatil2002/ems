import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import EditEmployee from "./pages/EditEmployee";
export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/employee/:_id" element={<ViewEmployee />} />
                    <Route path="/employee/edit/:_id" element={<EditEmployee />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
