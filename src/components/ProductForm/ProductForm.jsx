import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";
import Swal from 'sweetalert2'
import { API_URL } from "../../helpers/config";
import validation from "./ValidationForm";
import { Toast } from "react-bootstrap";


export default function ProductForm({setSidebarRender,setActive,setVisibleSidebar, visibleSidebar}) {

  const [arrayImages, setArrayImages] = useState("");
  const [errors, setErrors] = useState({});
  const [sizeStock , setSizeStock] = useState({}); // voy guardando pares key:value de talle y cantidad
  const [sizeArray , setSizeArray] = useState([]); // armo el array de objetos para enviar al back de size y stock
  const [categories,setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  const [closeAlert,setCloseAlert] = useState(true)
  
  

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
        setSidebarRender("productos")
        Swal.fire({
          title: res.data + " ¿Desea crear otro producto?",
          icon: "success",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Si",
          denyButtonText: `No`
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(()=>{
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
              })
              setSidebarRender("nuevo")
              setArrayImages([])
              setSizeStock({})
              ,1000})
           
          } else if (result.isDenied) {
            setSidebarRender("productos")
            setActive(2)
          }
        });        
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

    const handleClose = () => {
      setCloseAlert(false)
    }

    const handleVisibleSidebar = () => {
      setVisibleSidebar(!visibleSidebar);
    }
  
   
    return (
    <div className="bg-body-tertiary d-flex flex-column position-relative">
      <div className="d-flex mt-2 w-100 bg-body-secondary rounded-3 justify-content-start">
      <div className="justify-content-end d-flex">
          <button
            type="button"
            className="btn btn-ligth btn-s"
            onClick={handleVisibleSidebar}
          ><i className="bi bi-list fs-3"></i></button>
        </div>
      <p className="fs-2 mt-2 d-flex mx-auto">
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
                  className={errors.title ? "style.inputs form-control border-danger border-3 opacity-75" : "style.inputs form-control"}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Categoria</label>
                <select
              className={errors.category ? "form-select w-75 border border-danger border-3 opacity-75" : "form-select w-75"}
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
            </div> 
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className="style.labels d-flex flex-wrap">Sub-Categoria</label>
                <select
                className={errors.category ? "form-select w-75 border border-danger border-3 opacity-75" : "form-select w-75"}
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
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Marca</label>
                <input
                  name="brand"
                  value={product.brand}
                  className={errors.brand ? "style.inputs form-control w-75 border-danger border-3 opacity-75" : "style.inputs form-control w-75"}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Talle</label>                
                  <select name="size" onChange={handleSizes} className={errors.sizes ? "style.tipos form-select w-75 border-danger border-3 opacity-75" : "style.tipos form-select w-75"}>
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
            </div>
            {Object.keys(sizeStock).length > 0 ? 
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label  name="stock" className={style.labels}>Cantidad</label>
                <select id={style.cantidadSelect} name="stock" onChange={handleSizes} className={errors.sizes ? "style.tipos form-select border-danger border-3 opacity-75" : "style.tipos form-select"} >
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
                {Object.keys(sizeStock).length > 1 ? <button  className="btn btn-primary btn-sm fs-6" value="button" onClick={handleSizes}>Agregar talle y cantidad</button>: <button  className="btn btn-secondary btn-sm fs-6" value="button" disabled onClick={handleSizes}>Agregar talle y cantidad</button>}
               </div>
            </div>
            :
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label  name="stock" className={style.labels}>Cantidad</label>
                <select id={style.cantidadSelect} name="stock" onChange={handleSizes} disabled className={errors.sizes ? "style.tipos form-select border-danger border-3 opacity-75" : "style.tipos form-select  text-secondary"} >
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
                <button  className="btn btn-secondary btn-sm fs-6" value="button" disabled onClick={handleSizes}>Agregar talle y cantidad</button>
               </div>
            </div>}
            
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Color</label>
                <select
                  className={errors.color ?"form-select w-75 border-danger border-3 opacity-75" : "form-select w-75"}
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
                  className={errors.discount ? "style.inputs form-control w-75 border-danger border-3 opacity-75" : "style.inputs form-control w-75"}
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
                  className={errors.price ? "form-control w-75 border-danger border-3 opacity-75" :"form-control w-75"}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Genero</label>
                <select
                  className={errors.gender ? "form-control w-75 border-danger border-3 opacity-75" : "form-control w-75"}
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
                  className={errors.description ? "style.tipos form-control w-75 fs-5 mb-4 border-danger border-3 opacity-75": "style.tipos form-control w-75 fs-5 mb-4"}
                  onChange={handleChange}
                  >
                </textarea>
              </div>
            </div>
            <div className={style.divLabels}>
              <div className={style.inputBox}>
                <label className={style.labels}>Imagen</label>
                <div className={style.inputImage}>
                <UploadFile completeProduct={completeProduct} setArrayImages={setArrayImages}/>
                </div>
              </div>
            </div>
            {product.title && product.category && product.subCategory && product.brand && product.sizes.length && product.color && product.discount && product.price && product.gender && product.description && product.images.length ? 
            <div className="d-flex w-100 mt-4">
            {/* <button form className={Object.keys(errors).length>0 ? "btn btn-primary btn-lg w-100 disabled": "btn btn-primary btn-lg w-100"}> */}
            <button form className="btn btn-primary btn-lg w-100">
              Crear Producto
            </button>
            </div> 
            :
            <div className="d-flex w-100 mt-4">
            <button form className="btn btn-secondary btn-lg w-100 disabled opacity-75" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
              Crear Producto
            </button>
            </div>
      }
            <div className="d-flex w-100 mt-4">
            </div>
          </form>
        </div>
      </div>
      {closeAlert && <div class="alert alert-danger p-2 ms-auto d-flex sticky-bottom" role="alert">
            <button type="button" className="btn-close me-2" aria-label="Close" onClick={handleClose}></button>
            <div className="d-inline-block justify-content-center">Todos los campos son obligatorios</div>
        </div>}
      {errors.title && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.title}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.brand && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.brand}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.discount && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.discount}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.price && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.price}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.description && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                  <div className="d-flex justify-content-center fs-5">{errors.description}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
              </div>
      }
    </div>
  );
}


