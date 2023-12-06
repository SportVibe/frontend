import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import style from "./Sidebar.module.css"

function Sidebar() {
    return (
         <div className='text d-flex justify-content-between flex-column bg-dark p-3 vh-100 w-25'>
            <div>
                <a href="" className="p-3 text-white">
                    <i className="bi bi-gear fs-4 me-4"></i>
                    <span className="fs-3">SportVibe</span>
                </a>
                <hr className="text-secondary mt-3" />
                <ul className="nav nav-pills flex-column mt-2">
                    <li className="nav-item p-3">
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-speedometer2 me-3 fs-4"></i>
                        <span className="fs-4"><strong>Dasboard</strong></span>
                    </a>
                    </li>
                    <li className="nav-item p-3">
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-columns-gap me-3 fs-4"></i>
                        <span className="fs-4"><strong>Products</strong></span>
                    </a>
                    </li>
                    <li className="nav-item p-3">
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-graph-down me-3 fs-4"></i>
                        <span className="fs-4"><strong>Metricas</strong></span>
                    </a>
                    </li>
                    <li className="nav-item p-3">
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span className="fs-4"><strong>Users</strong></span>
                    </a>
                    </li>
                    <li className="nav-item p-3">
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-speedometer2 me-3 fs-4"></i>
                        <span className="fs-4"><strong>Dasboard</strong></span>
                    </a>
                    </li>
                    </ul>
                </div>
                <div className="nav-item p-3 ">
                    <hr className="text-secondary mt-3" />
                    <div className="nav-item p-2 ">
                        <a href="" className="p-1 text-white">
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span className="fs-4"><strong>ADMIN</strong></span>
                        </a>
                    </div>
                </div>
            
        </div>
        
    );
}

export default Sidebar;