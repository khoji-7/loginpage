import "./style.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PlaceIcon from "@mui/icons-material/Place";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const logout = () => {
        localStorage.removeItem("tokenbek");
        navigate("/");
    };

    return (
        <div className={`sidebarContainer ${isExpanded ? "expanded" : "collapsed"}`}>
            <div className="sidebarContent">
                <div>
                    {isExpanded ? (
                        <p className="sidebarContentTitle">avtozoom admin</p>
                    ) : (
                        <img
                            src={"https://autozoom-admin-nine.vercel.app/assets/autozoom-CM99tOti.svg"}
                            alt="Logo"
                            className="sidebarLogo"
                        />
                    )}
                </div>
                <div className="sidebarBtnParent">
                <button className="toggleButton" onClick={toggleSidebar}>
                    {isExpanded ? "<" : ">"}
                </button>
                    <NavLink to="/home" className="sidebarRoute" activeClassName="active">
                        <HomeIcon />
                        {isExpanded && "Dashboard"}
                    </NavLink>
                    <NavLink to="/setting" className="sidebarRoute" activeClassName="active">
                        <SettingsIcon />
                        {isExpanded && "Settings"}
                    </NavLink>
                    <NavLink to="/brand" className="sidebarRoute" activeClassName="active">
                        <StorefrontIcon />
                        {isExpanded && "Brands"}
                    </NavLink>
                    <NavLink to="/car" className="sidebarRoute" activeClassName="active">
                        <TimeToLeaveIcon />
                        {isExpanded && "Cars"}
                    </NavLink>
                    <NavLink to="/city" className="sidebarRoute" activeClassName="active">
                        <LocationCityIcon />
                        {isExpanded && "Cities"}
                    </NavLink>
                    <NavLink to="/location" className="sidebarRoute" activeClassName="active">
                        <PlaceIcon />
                        {isExpanded && "Locations"}
                    </NavLink>
                    <NavLink to="/model" className="sidebarRoute" activeClassName="active">
                        <FormatAlignJustifyIcon />
                        {isExpanded && "Models"}
                    </NavLink>
                    

                    
                </div>
                
            </div>
            <button onClick={logout} className="sidebarBtn">
                        <LogoutIcon />

                        {isExpanded && "Logout"}
                        </button>
        </div>
    );
}
