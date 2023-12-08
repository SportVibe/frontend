import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./AdminDashBoard.module.css";
import ProductForm from "../ProductForm/ProductForm";


function AdminDashBoard() {

    const [productArray, setProductArray] = useState(null);
    const [sidebarRender,setSidebarRender] = useState(null);
    //const [crearProducto,setCrearProducto] = useState(false)
    

    useEffect(() => {
        axios("https://api.escuelajs.co/api/v1/products").then(({ data }) => {
          setProductArray(data);
        });
      }, []);
      
     

  const renderProducts = () => {
     return productArray?.length > 0  && productArray.map((product, i) => {
        return (
          <div key={i} className={styles.cardComponentContainer}>
            <ProductCard productData={product} />
          </div>
        );
      })
    }

    
 return (
    <div className="d-flex">
      <Sidebar setSidebarRender={setSidebarRender} />
      <div className="bg-transparent w-100">
        <nav className="navbar navbar-ligth bg-body-secondary justify-content-around">
          <a className="bi bi-bezier2"></a>
          <form className="form-inline">
            <div className="d-flex">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Producto..."
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
        </nav>
        {sidebarRender === "productos" ? <div className={styles.conteinerCards}>
            {renderProducts()}
            </div> : null}
        {sidebarRender === "nuevo"  && 
        <div>
            <ProductForm />
        </div>}
        
      </div>
      
    </div>
  );
}

export default AdminDashBoard;
