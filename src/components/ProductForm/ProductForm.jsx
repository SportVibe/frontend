import React, { useState } from "react";
import style from "./Form.module.css";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";
//import validation from "../../../../api/src/helpers/validation";


export default function ProductForm() {

  const [images, setImages] = useState([]);
  const [arrayImages, setArrayImages] = useState([]);
  


  let [product, setProduct] = useState({
    title: "",
    sizes: "",
    mark:"",
    category: "",
    subCategory:"",
    color: "",
    discount: "",
    price: "",
    gender: "",
    description:"",
    images:[], 
  });

  

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    setProduct({...product,images:[...images,arrayImages]});
    event.preventDefault();
    // if(Object.keys(errors).length !== 0){
    //   setErrors({general:"Faltan Campos obligatorios"});
    // }else{
      const endpoint = "http://localhost:3005/product";
      axios.post(endpoint,product)
      .then((res) => {console.log(res)}) ///QUE data llega del back?
      .catch(error => window.alert(error.message)) //Que formato tiene el error??
    };
   

   const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
//     setErrors(
//       validation({ ...product, [event.target.name]: event.target.value })
//     );
   };

  return (
    <div>
      <p className={style.titulo}>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-walking" viewBox="0 0 16 16">
  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.75.75 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843a1.93 1.93 0 0 0 .006-.067l1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
</svg>Nuevo Producto
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-walking" viewBox="0 0 16 16">
  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.75.75 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843a1.93 1.93 0 0 0 .006-.067l1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
</svg>
      </p>
      <div className={style.containerForm}>
        <div className={style.divForm}>
          <form onSubmit={handleSubmit} className={style.form}>
            <div id={style.nameContainer} >
              <div className={style.inputBox}>
                <label className={style.labels}>Nombre Producto</label>
                <input
                  name="title"
                  value={product.title}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p className={style.errors}>{errors.title}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Categoria</label>
                <input
                  name="category"
                  value={product.category}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorAtaque}>{errors.category}</p> */}
            </div>           
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Sub-Categoria</label>
                <input
                  name="subCategory"
                  value={product.subCategory}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorAtaque}>{errors.subCategory}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Marca</label>
                <input
                  name="mark"
                  value={product.mark}
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorVida}>{errors.mark}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Talle</label>
                <input
                  name="sizes"
                  value={product.sizes}
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorVida}>{errors.sizes}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Cantidad</label>
                <input
                  name="cantidad"
                  value={product.cantidad}
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorVida}>{errors.sizes}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Color</label>
                <input
                  name="color"
                  value={product.color}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Descuento</label>
                <input
                  name="discount"
                  value={product.discount}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Precio</label>
                <input
                  name="price"
                  value={product.price}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Genero</label>
                <input
                  name="gender"
                  value={product.gender}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div id={style.tipoPadre} >
              <div id={style.tipoContainer} >
                <label className={style.labels}>Descripcion</label>
                <textarea
                  name="description"
                  value={product.description}
                  className={style.tipos}
                  onChange={handleChange}
                  >
                </textarea>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Imagen</label>
                <div className={style.inputImage}>
                <UploadFile setArrayImages={setArrayImages} setImages={setImages}/>
                </div>
              </div>
            </div>
            <button className={style.buttonForm}>
              Crear
            </button>
          </form>
            {/* <p id={style.campos}>{errors.general}</p> */}
        </div>
      </div>
    </div>
  );
}
