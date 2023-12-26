import React , { useState }from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css"

function Sidebar(props) {

    const opcionSeleccionadaSidebar = (e) =>{
        e.preventDefault();
        props.setSidebarRender(e.target.attributes.name.nodeValue)
    }

    
    const [active,setActive] = useState();
    return (
         <div className='text d-flex sticky-sm-top justify-content-between flex-column bg-dark p-3 vh-100'>
            <div>
                <a href="/" className="p-3 text-white">
                    <i className="bi bi-gear fs-4 me-4"></i>
                    <span className="fs-3"><strong>SportVibe</strong></span>
                </a>
                <hr className="text-secondary mt-3" />
                <ul className="nav nav-pills flex-column mt-2">
                    <li className={active === 1 ? "active nav-item p-3" : "nav-item p-3"} onClick={(e) => setActive(1)}>
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-speedometer2 me-3 fs-4"></i>
                        <span className="fs-4" name="dashboard">Dasboard</span>
                    </a>
                    </li>
                    <li className={active === 2 ? "active nav-item p-3" : "nav-item p-3"} value="productos" name="productos" onClick={(e) =>setActive(2)}>
                    <a href="" className="p-1 text-white" name="productos" onClick={opcionSeleccionadaSidebar}>
                        <i className="bi bi-columns-gap me-3 fs-4"></i>
                        <span className="fs-4" name="productos">Productos</span>
                    </a>
                    </li>
                    <li className={active === 3 ? "active nav-item p-3" : "nav-item p-3"} onClick={(e)=>setActive(3)}>
                    <a href="" className="p-1 text-white" onClick={opcionSeleccionadaSidebar}>
                        <i className="bi bi-bag-plus me-3 fs-4"></i>
                        <span className="fs-4" name="nuevo">Nuevo</span>
                    </a>
                    </li>
                    <li className={active === 4 ? "active nav-item p-3" : "nav-item p-3"} onClick={(e) => setActive(4)}>
                    <a href="" className="p-1 text-white" onClick={opcionSeleccionadaSidebar}>
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span className="fs-4" name="usuarios">Usuarios</span>
                    </a>
                    </li>
                    <li className={active === 5 ? "active nav-item p-3" : "nav-item p-3"} onClick={(e) => setActive(5)}>
                    <a href="" className="p-1 text-white">
                        <i className="bi bi-bullseye me-3 fs-4"></i>
                        <span className="fs-4" name="otro">Otro</span>
                    </a>
                    </li>
                    </ul>
                </div>
                <div className="nav-item p-3 ">
                    <hr className="text-secondary mt-3" />
                    <div className="nav-item p-2 ">
                        <a href="" className="p-1 text-white">
                        <i className="bi bi-award me-3 fs-4"></i>
                        <span className="fs-4"><strong>ADMIN</strong></span>
                        </a>
                    </div>
                </div>
            
        </div>
      
        
    );
}

export default Sidebar;