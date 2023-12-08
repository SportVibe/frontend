import React, { useState } from "react";
import style from "./Form.module.css";
//import validation from "../../../../api/src/helpers/validation";


export default function ProductForm() {

  const [product, setProduct] = useState({
    nombre: "",
    talle: "",
    categoria: "",
    color: "",
    material: "",
    otroDato: "",
    otroDato1: "",
    descripcion:"",
    imagen: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
//     event.preventDefault();
//     if(Object.keys(errors).length !== 0){
//       setErrors({general:"Faltan Campos obligatorios"});
//     }else{
//       const endpoint = "http://localhost:3001/pokemons/create";
//       axios.post(endpoint,pokeData)
//       .then(({data}) => {window.alert(data.message +" => "+ data.data),navigate("/home")})
//       .catch(error => window.alert(error.response.data.message))
//     }
   };

   const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
//     setErrors(
//       validation({ ...pokeData, [event.target.name]: event.target.value })
//     );
   };

  return (
    <div>
      <p className={style.titulo}>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-walking" viewBox="0 0 16 16">
  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.75.75 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843a1.93 1.93 0 0 0 .006-.067l1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
</svg>Nuevo Producto
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-walking" viewBox="0 0 16 16">
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
                  name="nombre"
                  value={product.nombre}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              <p className={style.errors}>{errors.nombre}</p>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Talle</label>
                <input
                  name="talle"
                  value={product.talle}
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              <p id={style.errorVida}>{errors.talle}</p>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Categoria</label>
                <input
                  name="categoria"
                  value={product.categoria}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
              <p id={style.errorAtaque}>{errors.categoria}</p>
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
                <label className={style.labels}>Material</label>
                <input
                  name="velocidad"
                  value={product.velocidad}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>otroDato</label>
                <input
                  name="otroDato"
                  value={product.otroDato}
                  type="text"
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>otroDato1</label>
                <input
                  name="otroDato1"
                  value={product.otraDato1}
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
                  name="descripcion"
                  value={product.descripcion}
                  className={style.tipos}
                  onChange={handleChange}
                  >
                </textarea>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Imagen</label>
                <input
                  name="imagen"
                  value={product.imagen}
                  className={style.inputs}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <button className={style.buttonForm}>
              Crear
            </button>
          </form>
            <p id={style.campos}>{errors.general}</p>
        </div>
      </div>
    </div>
  );
}












// function ProductForm() {
//     return (
//         <div>
//             <h1>PRUEBA FORMULARIO CREACION</h1>
//         </div>
//     );
// }

// export default ProductForm;