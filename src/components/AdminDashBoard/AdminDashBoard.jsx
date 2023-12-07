import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";


function AdminDashBoard() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="bg-black w-100">
                <p className="text-center text-white">OTHER COMPONENTS</p>
            </div>
        </div>

    );
}

export default AdminDashBoard;