import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "../pages/loginPage/loginPage.jsx";
import HomePage from "../pages/homePage/homePage.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import Settings from "../pages/settings/"
import Model from "../pages/models/"
import Cars from "../pages/cars/"
import Location from "../pages/locations"
import Brand from "../pages/brands/"
import Cities from "../pages/cities/"


import "../App.css"

const AppRouter = () => {
    const token = localStorage.getItem("tokenbek");
    let navigate = useNavigate();
    useEffect(() => {
        if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <HomePage />
                    </div>
                }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/brand"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Brand />
                    </div>
                }
            />
            <Route
                path="/car"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Cars/>
                    </div>
                }
            />
            <Route
                path="/city"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Cities />
                    </div>
                }
            />
            <Route
                path="/location"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Location />
                    </div>
                }
            />
            <Route
                path="/model"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Model/>
                    </div>
                }
            />
            <Route
                path="/setting"
                element={
                    <div className="appContaniner">
                        <Sidebar />
                        <Settings />
                    </div>
                }
            />
            

        </Routes>
    );
};

export default AppRouter;
