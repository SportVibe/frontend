import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./AdminDashBoard.module.css";

function AdminDashBoard() {
  const [productArray, setProductArray] = useState(null);
  const [productRender,setProductRender] = useState(0);
  useEffect(() => {
    axios("https://api.escuelajs.co/api/v1/products").then(({ data }) => {
      setProductArray(data);
    });
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
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
        <div className={styles.conteinerCards}>
        {productArray?.length > 0 &&
          productArray.map((product, i) => {
            return (
              <div key={i} className={styles.cardComponentContainer}>
                <ProductCard productData={product} />
              </div>
            );
          })}
      </div>
      </div>
      
    </div>
  );
}

export default AdminDashBoard;
