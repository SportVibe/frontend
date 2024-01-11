import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";
import Swal from 'sweetalert2'
import { API_URL } from "../../helpers/config";
import validation from "./ValidationForm";


export default function ProductForm() {

  const [arrayImages, setArrayImages] = useState("");
  const [errors, setErrors] = useState({});
  const [sizeStock , setSizeStock] = useState({}); // voy guardando pares key:value de talle y cantidad
  const [sizeArray , setSizeArray] = useState([]); // armo el array de objetos para enviar al back de size y stock
  const [categories,setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  

  let [product, setProduct] = useState({
    title: "",
    sizes: [],
    brand:"",
    category: "",
    subCategory:"", 
    color:[],
    discount: "",
    price: "",
    gender: "",
    description:"", 
  });
  
  const completeProduct = () => {
    let arr=[]
    arr.push(arrayImages)
    //console.log(arr)
    setProduct({
    ...product,
    sizes:[...sizeArray],
    images:[...arr]})
    setProduct({...product,sizes:[...sizeArray],images:[...arr],sport:product.category})
  }

  useEffect(()=>{
    completeProduct();
  },[arrayImages])

  useEffect(()=>{
    handleCategories();
  },[])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
      const endpoint = `${API_URL}/product`;
      axios.post(endpoint,product)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500
        });
        setProduct({
          title: "",
          sizes: [],
          brand:"",
          category: "",
          subCategory:"", 
          color:[],
          discount: "",
          price: "",
          gender: "",
          description:"", 
        });
        setSizeArray([]);
        setSizeStock({})
      }
        ) 
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: error.response.data.error,
          showConfirmButton: true,
          })
      }) 
    };
   

   const handleChange = (event) => {
    const input = event.target.name
    event.preventDefault();
    setProduct({ ...product, [event.target.name]: event.target.value });
    setErrors(
      validation({ ...product, [event.target.name]: event.target.value },input)
    );

   };
   
   const handleSizes = (e) => {
     e.preventDefault();
    if (e.target.value !== "button"){
      setSizeStock({...sizeStock,[e.target.name]:e.target.value}) //Objeto formateado {size:"m",stock:"5"} en estado local sizeStock
    }else {
      setSizeArray([...sizeArray,sizeStock]) // guardo key:value {size:"m",stock:"5"} en array estado local
    }    
      }

    const handleColor = (e) => {
      let arr=[];
      arr.push(e.target.value.toString())
      setProduct({...product,color:arr})
    }

    const handleCategories = () => {
      axios(`${API_URL}/product/category`)
      .then(({data}) => setCategories(data.categories))
      .catch((err) => console.log(err))
      axios(`${API_URL}/product/sub-category`)
      .then(({data}) => setSubCategories(data.subCategories))
      .catch((err) => console.log(err))
    }
  
   
    return (
    <div className="bg-light d-flex flex-column">
      <div className="d-flex mt-2 w-100 bg-body-secondary justify-content-center mx-auto rounded-3">
      <p className="fs-2 mt-2">
      Nuevo Producto
      </p>
      </div>
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
                  className={errors.title ? "style.inputs form-control border-danger border-3 bg-danger-subtle opacity-75" : "style.inputs form-control"}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p className={style.errors}>{errors.title}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Categoria</label>
                <select
              className={errors.category ? "form-select w-75 border border-danger border-3 bg-danger-subtle opacity-75" : "form-select w-75"}
              aria-label="category"
              name="category"
              onChange={handleChange}>
              <option disabled selected>
                Seleccione Categoria
              </option>
              {categories?.map((cat) => 
                <option value={cat.toLowerCase()}>{cat}</option>
              )}
            </select>
              </div>
              {/* <p id={style.errorAtaque}>{errors.category}</p> */}
            </div>           
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className="style.labels d-flex flex-wrap">Sub-Categoria</label>
                <select
                className={errors.category ? "form-select w-75 border border-danger border-3 bg-danger-subtle opacity-75" : "form-select w-75"}
                aria-label="subCategory"
                name="subCategory"
                onChange={handleChange}
            >
              <option disabled selected>
                Seleccione Sub-categoria
              </option>
              {subCategories?.map((subCat) => 
                <option value={subCat.toLowerCase()}>{subCat}</option>
              )}
            </select>
              </div>
              {/* <p id={style.errorAtaque}>{errors.subCategory}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Marca</label>
                <input
                  name="brand"
                  value={product.brand}
                  className={errors.brand ? "style.inputs form-control w-75 border-danger border-3 bg-danger-subtle opacity-75" : "style.inputs form-control w-75"}
                  onChange={handleChange}
                ></input>
              </div>
              {/* <p id={style.errorVida}>{errors.mark}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Talle</label>
                  <select name="size" onChange={handleSizes} className={errors.sizes ? "style.tipos form-select w-75 border-danger border-3 bg-danger-subtle opacity-75" : "style.tipos form-select w-75"}>
                  <option  disabled selected>Seleccione Talle</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                  <option value="xxxl">XXXL</option>
                  <option value="otro">Otro</option>
                  <option value="noAplica">No Aplica</option>
                 </select>
              </div>
              {/* <p id={style.errorVida}>{errors.sizes}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label  name="stock" className={style.labels}>Cantidad</label>
                <select id={style.cantidadSelect} name="stock" onChange={handleSizes} className={errors.sizes ? "style.tipos form-select border-danger border-3 bg-danger-subtle opacity-75" : "style.tipos form-select"} >
                <option value="" disabled selected>Cantidad</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
                <button  className={sizeArray.length>=1? "btn btn-primary btn-sm fs-6" : "btn btn-primary btn-sm fs-6"} value="button" onClick={handleSizes}>Agregar talle y cantidad</button>
               </div> 
              {/* <p id={style.errorVida}>{errors.sizes}</p> */}
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Color</label>
                <select
                  className={errors.color ?"form-select w-75 border-danger border-3 bg-danger-subtle opacity-75" : "form-select w-75"}
                  aria-label="color"
                  name="color"
                  onChange={handleColor}>
              <option disabled selected>
                Seleccione Color
              </option>
              <option value="negro">NEGRO</option>
              <option value="rojo">ROJO</option>
              <option value="blanco">BLANCO</option>
              <option value="azul">AZUL</option>
              <option value="verde">VERDE</option>
              <option value="marron">MARRON</option>
              <option value="naranja">NARANJA</option>
              <option value="gris">GRIS</option>
            </select>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Descuento</label>
                <input
                  name="discount"
                  value={product.discount}
                  type="text"
                  className={errors.discount ? "style.inputs form-control w-75 border-danger border-3 bg-danger-subtle opacity-75" : "style.inputs form-control w-75"}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={errors.precio ? "style.labels border-danger border-3 bg-danger-subtle opacity-75" : style.labels}>Precio</label>
                <input
                  name="price"
                  value={product.price}
                  type="text"
                  className="style.inputs form-control w-75"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Genero</label>
                <select
                  className={errors.gender ? "form-control w-75 border-danger border-3 bg-danger-subtle opacity-75" : "form-control w-75"}
                  aria-label="gender"
                  name="gender"
                  onChange={handleChange}>
              <option disabled selected>
                Seleccione genero
              </option>
              <option value="hombre">HOMBRE</option>
              <option value="mujer">MUJER</option>
              <option value="unisex">UNISEX</option>
            </select>
              </div>
            </div>
            <div id={style.tipoPadre} >
              <div id={style.tipoContainer} >
                <label className={style.labels}>Descripcion</label>
                <textarea
                  name="description"
                  value={product.description}
                  className={errors.description ? "style.tipos form-control w-75 fs-5 mb-4 border-danger border-3 bg-danger-subtle opacity-75": "style.tipos form-control w-75 fs-5 mb-4"}
                  onChange={handleChange}
                  >
                </textarea>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Imagen</label>
                <div className={style.inputImage}>
                {Object.keys(errors).length === 0 && <UploadFile completeProduct={completeProduct} setArrayImages={setArrayImages}/>}
                </div>
              </div>
            </div>
            <div className="d-flex w-100 mt-4">
            <button form className={Object.keys(errors).length>0 ? "btn btn-primary btn-lg w-100 disabled": "btn btn-primary btn-lg w-100"}>
              Crear
            </button>
            </div>
          </form>
            {/* <p id={style.campos}>{errors.general}</p> */}
        </div>
      </div>
    </div>
  );
}


