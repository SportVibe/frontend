import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";

function ProductUpdate({ data, setSelectedRow }) {
  const [dataProductUpdate, setDataProductUpdate] = useState(null); //data que viene del detail del back
  const [product, setProduct] = useState(""); //guardo las modificaciones - estado intermedio
  const [isEditing, setEditing] = useState(false);
  const [newProduct, setNewProduct] = useState(""); // cuando se guardan los cambios , este es el state que envio al back (put)
  useEffect(() => {
    axios(`${API_URL}/detail/${data.id}`)
      .then(({ data }) => {
        setDataProductUpdate(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function handleChange(e) {
    setProduct({...product, [e.target.name]: e.target.value });
  }

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(true);
    setNewProduct({ ...dataProductUpdate, ...product });
  };
  const handleClose = () => {
    setEditing(false);
    setSelectedRow("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);
  }

  const handleImage = (image, event) => {
    event.preventDefault();
    let img = [];
    img = dataProductUpdate.Images.filter((img) => img !== image);
    setDataProductUpdate({ ...dataProductUpdate, Images: img });
    console.log(newProduct);
  };

  const handleWidget = (e) => {
    e.preventDefault();
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "drrswxx5y",
        uploadPreset: "images",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          let imgCloudinary = [...dataProductUpdate.Images,result.info.url];
          setDataProductUpdate({...dataProductUpdate,Images:imgCloudinary})
        }
      }
    );
    myWidget.open();
  };
  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="d-flex px-5">
        <form className="d-flex flex-column">
          <div className="form-group bg-light rounded-pill mt-2">
            <label
              className="d-flex justify-content-center p-2"
              for="formGroupExampleInput"
            >
              <h3 className="">ID : {dataProductUpdate?.id}</h3>
            </label>
          </div>
          <div className="form-group w-100 pb-3 mt-3">
            <label className="" for="formGroupExampleInput">
              <h5>TITULO</h5>
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              className="form-control"
              id="formGroupExampleInput"
              value={product.title || dataProductUpdate?.title}
            />
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput">
              <h5>CATEGORIA</h5></label>
            <select
              className="form-select"
              aria-label="category"
              name="category"
              onChange={handleChange}
            >
              <option disabled selected>
                {dataProductUpdate?.category} {"--->"} Seleccione Nueva Categoria
              </option>
              <option value="CALZADO">CALZADO</option>
              <option value="DEPORTE">DEPORTE</option>
              <option value="ROPA">ROPA</option>
            </select>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>SUBCATEGORIA</h5></label>
            <select
              className="form-select"
              aria-label="subCategory"
              name="subCategory"
              onChange={handleChange}
            >
              <option disabled selected>
                {dataProductUpdate?.subCategory} {"--->"} Seleccione Nueva Sub-categoria
              </option>
              <option value="ZAPATILLAS">ZAPATILLAS</option>
              <option value="BOTINES">BOTINES</option>
              <option value="ZAPATOS">ZAPATOS</option>
            </select>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>MARCA</h5></label>
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              className="form-control"
              value={product.brand || dataProductUpdate?.brand}
            />
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>DESCUENTO</h5></label>
            <input
              type="text"
              name="discount"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.discount || dataProductUpdate?.discount}
            />
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>GENERO</h5></label>
            <select
              className="form-select"
              aria-label="gender"
              name="gender"
              onChange={handleChange}
            >
              <option disabled selected>
                Seleccione genero
              </option>
              <option value="HOMBRE">HOMBRE</option>
              <option value="MUJER">MUJER</option>
              <option value="UNISEX">UNISEX</option>
            </select>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>PRECIO</h5></label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.price || dataProductUpdate?.price}
            />
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput"><h5>COLOR</h5></label>
            <input
              type="text"
              name="color"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.Colors || dataProductUpdate?.Colors.toString()}
            />
          </div>
          <div class="form-check form-switch my-3">
            <input className="form-check-input mx-2" type="checkbox" role="switch" onClick={(e)=>console.log(e)} id="flexSwitchCheckDefault"/>
            <label className="form-check-label" for="flexSwitchCheckDefault"><h5>Modificar cantidad y talles</h5></label>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput2"><h5>DESCRIPCION</h5></label>
            <textarea
              rows="4"
              type="text"
              name="description"
              onChange={handleChange}
              className="form-control"
              value={product.description || dataProductUpdate?.description}
            />
          </div>
          <div className="form-group d-flex flex-wrap mt-3 pb-3 justify-content-center">
            <label for="formGroupExampleInput"></label>
            {dataProductUpdate?.Images.map((image) => {
              return (
                <div className="d-flex me-3">
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        handleImage(image, event);
                      }}
                      name={image.toString()}
                    ></button>
                    <img className="rounded-circle" width="150px" src={image}></img>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn-group d-flex rounded-3 mt-2 pb-3">
            <button
              type="button"
              className="btn btn-secondary me-2 fs-5 rounded-3 mt-2"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary fs-5 me-2 rounded-3 mt-2"
            >
              Guardar
            </button>
            <button
              id="upload_widget"
              className="btn btn-primary fs-5 me-2 rounded-3 mt-2"
              onClick={handleWidget}
            >
              <i class="bi bi-box-arrow-up"></i> Imagenes
            </button>
            <button
              onClick={()=>handleSubmit}
              className="btn btn-primary fs-5 me-2 rounded-3 mt-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div className={isEditing ? "d-flex flex-wrap mt-5 bg-light rounded justify-content-center border pt-5 my-5" : "sr-only"}>
        <div className="d-flex flex-column align-items-center">
          <h2 className="d-flex justify-content-center pb-3"> <i className="bi bi-pencil-square px-2"></i>Actualización</h2>
          <label for="formGroupExampleInput"><h5>TITULO :</h5></label>
          {newProduct.title ? `${newProduct.title}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>CATEGORIA :</h5></label>
          {newProduct.category ? `${newProduct.category}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>SUBCATEGORIA :</h5></label>
          {newProduct.subCategory ? `${newProduct.subCategory}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>MARCA :</h5></label>
          {newProduct.brand ? `${newProduct.brand}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>DESCUENTO :</h5></label>
          {newProduct.discount ? `${newProduct.discount}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>GENERO :</h5></label>
          {newProduct.gender ? `${newProduct.gender}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>PRECIO :</h5></label>
          {newProduct.price ? `${newProduct.price}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>COLOR :</h5></label>
          {newProduct.Colors ? `${newProduct.Colors}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>DESCRIPCION :</h5></label>
          {newProduct.description ? `${newProduct.description}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput"><h5>IMAGENES :</h5></label>
          <div className="d-flex flex-wrap justify-content-center my-4">
            {newProduct.Images &&
              newProduct?.Images.map((image) => {
                return (
                  <div className="d-flex flex-wrap">
                    <div className="">
                      <img className="rounded-circle" width="150px" src={image}></img>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;



