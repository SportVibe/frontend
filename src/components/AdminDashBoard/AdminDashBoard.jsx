// import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";
import ProductCard from "../ProductCard/ProductCard";
// import axios from "axios";
import { useState } from "react";
import styles from "./AdminDashBoard.module.css";
import ProductForm from "../ProductForm/ProductForm";
import UserForm from "../UserForm/UserForm";
import { useSelector } from "react-redux";

function AdminDashBoard() {
  const productRender = useSelector((state) => state.products);
  const [sidebarRender, setSidebarRender] = useState("productos");
  

  const renderProducts = () => {
    return (productRender.data?.length > 0 && productRender.data.map((product, i) => {
       return (
        <div key={i} className={styles.cardComponentContainer}>
          <ProductCard productData={product} />
        </div>
      );
    }))
  }


  return (
    <div className="d-flex">
      <Sidebar setSidebarRender={setSidebarRender} />
      <div className="bg-transparent w-100">
        <nav className="navbar navbar-ligth bg-body-secondary justify-content-between">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-tools ms-3" viewBox="0 0 16 16">
            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
          </svg>
          <form className="form-inline">
            <div className="d-flex">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Producto..."
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 me-4"
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
        {sidebarRender === "nuevo" &&
          <div>
            <ProductForm />
          </div>}
        {sidebarRender === "usuarios" ? <UserForm /> : null}

      </div>

    </div>
  );
}

export default AdminDashBoard;
