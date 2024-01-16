import React , { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css"

function Sidebar({setSidebarRender,setActive,active}) {

    const opcionSeleccionadaSidebar = (e) =>{
        e.preventDefault();
        console.log(e.target.attributes.name.nodeValue);
        setSidebarRender(e.target.attributes.name.nodeValue)
    }

    const handlerMenu = (e) =>{
        console.log(e.target.id);
        setActive(e.target.id)
        opcionSeleccionadaSidebar(e)
    }

    
    //const [active,setActive] = useState();
    return (
         <div className='text d-flex sticky-sm-top justify-content-between flex-column bg-dark p-3 align-items-center'>
            <div className="">
                <a href="/" className="p-3 text-white">
                    <i className="fs-4  d-md-inline-block d-lg-none d-xl-none d-xxl-none">SV</i>
                    <span className="fs-3 d-none d-lg-inline-block"><strong>SportVibe</strong></span>
                </a>
                <hr className="text-light mt-3" />
                <ul className="nav nav-pills flex-column mt-2">
                    
                    <li id="1" name="metricas" className={active === "1" ? "active nav-item p-1 mb-3" : "nav-item p-1 mb-3"} value="metricas" onClick={(e)=>handlerMenu(e)}>
                    <a href="" className="p-1 text-white">
                        <i name="metricas" className="bi bi-speedometer2 me-3 fs-5 d-md-inline-block d-lg-none d-xl-none d-xxl-none" onClick={(e) => handlerMenu(e)}></i>
                        <span name="metricas" className="fs-5 d-none d-lg-inline-block">Metricas</span>
                    </a>
                    </li>
                    
                    <li id="2" name="productos" className={active === "2" ? "active nav-item p-1 mb-3" : "nav-item p-1 mb-3"} value="productos" onClick={(e) =>handlerMenu(e)}>
                    <a href="" className="p-1 text-white">
                        <i name="productos" className="bi bi-columns-gap me-3 fs-5 d-md-inline-block d-lg-none d-xl-none d-xxl-none" onClick={(e) => handlerMenu(e)}></i>
                        <span name="productos" className="fs-5 d-none d-lg-inline-block" >Productos</span>
                    </a>
                    </li>
                    
                    <li id="3" name="nuevo" className={active === "3" ? "active nav-item p-1 mb-3" : "nav-item p-1 mb-3"} onClick={(e)=>handlerMenu(e)}>
                    <a href="" className="p-1 text-white">
                        <i name="nuevo" className="bi bi-bag-plus me-3 fs-5 d-md-inline-block d-lg-none d-xl-none d-xxl-none" onClick={(e) => handlerMenu(e)}></i>
                        <span name="nuevo" className="fs-5 d-none d-lg-inline-block">Nuevo</span>
                    </a>
                    </li>
                    
                    <li id="4" name="usuarios" className={active === "4" ? "active nav-item p-1 mb-3" : "nav-item p-1 mb-3"} onClick={(e) => handlerMenu(e)}>
                    <a href="" className="p-1 text-white">
                        <i name="usuarios" className="bi bi-person-circle me-3 fs-5 d-md-inline-block d-lg-none d-xl-none d-xxl-none" onClick={(e) => handlerMenu(e)}></i>
                        <span name="usuarios" className="fs-5 d-none d-lg-inline-block">Usuarios</span>
                    </a>
                    </li>
                    
                    <li id="5" name="comentarios" className={active === "5" ? "active nav-item p-1 mb-3" : "nav-item p-1 mb-3"} onClick={(e) => handlerMenu(e)}>
                    <a href="" className="p-1 text-white">
                    <i name="comentarios" class="bi bi-people me-2 fs-5 d-md-inline-block d-lg-none d-xl-none d-xxl-none" onClick={(e) => handlerMenu(e)}></i>
                        <span className="fs-5 d-none d-lg-inline-block" name="comentarios" onClick={opcionSeleccionadaSidebar}>Comentarios</span>
                    </a>
                    </li>
                    </ul>
                </div>
                <div className="nav-item p-3 ">
                    <hr className="text-light text-center d-flex justify-content-center mt-3 " />
                    <div className="nav-item p-2 ">
                        <p className="p-1 text-white"> 
                        <i className="bi bi-award me-3 fs-4 d-md-inline-block d-lg-none d-xl-none d-xxl-none"></i>
                        <span className="d-flex fs-4 d-none d-lg-inline-block"><strong>ADMIN</strong></span>
                        </p>
                    </div>
                </div>
            
        </div>
      
        
    );
}

export default Sidebar;