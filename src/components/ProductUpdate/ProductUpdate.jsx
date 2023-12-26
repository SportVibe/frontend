import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";

function ProductUpdate({ data, setSelectedRow }) {
  const [dataProductUpdate, setDataProductUpdate] = useState(null); //data que viene del detail del back
  const [product, setProduct] = useState(""); //guardo las modificaciones - estado intermedio
  const [isEditing, setEditing] = useState(false); // por ahora no lo aplicos
  const [newProduct, setNewProduct] = useState(""); // cuando se guardan los cambios , este es el state que envio al back (put)
  useEffect(() => {
    axios(`${API_URL}/detail/${data.id}`)
      .then(({ data }) => {
        setDataProductUpdate(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function handleChange(e) {
    setEditing(true);
    setProduct({...product, [e.target.name]: e.target.value });
  }

  const handleSave = (e) => {
    e.preventDefault();
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
    <div className="d-flex flex-wrap">
      <div className="d-flex">
        <form className="">
          <div className="form-group">
            <label
              className="d-flex justify-content-center"
              for="formGroupExampleInput"
            >
              <h3>ID : {dataProductUpdate?.id}</h3>
            </label>
          </div>
          <div className="form-group w-100">
            <label className="" for="formGroupExampleInput">
              TITULO
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
          <div className="form-group">
            <label for="formGroupExampleInput">CATEGORIA</label>
            <br></br>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.category || dataProductUpdate?.category}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput">SUB-CATEGORIA</label>
            <input
              type="text"
              name="subCategory"
              onChange={handleChange}
              className="form-control"
              value={product.subCategory || dataProductUpdate?.subCategory}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput">MARCA</label>
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              className="form-control"
              value={product.brand || dataProductUpdate?.brand}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput">DESCUENTO</label>
            <input
              type="text"
              name="discount"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.discount || dataProductUpdate?.discount}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput">GENERO</label>
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
          <div className="form-group">
            <label for="formGroupExampleInput">PRECIO</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.price || dataProductUpdate?.price}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput">COLOR</label>
            <input
              type="text"
              name="color"
              onChange={handleChange}
              className="form-control"
              id="formGroupExampleInput"
              value={product.Colors || dataProductUpdate?.Colors.toString()}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput2">DESCRIPCION</label>
            <textarea
              rows="4"
              type="text"
              name="description"
              onChange={handleChange}
              className="form-control"
              value={product.description || dataProductUpdate?.description}
            />
          </div>
          <div className="form-group d-flex flex-wrap mt-3">
            <label for="formGroupExampleInput"></label>
            {/* <input type="text" name="subCategory" onChange={handleChange} className="form-control" id="formGroupExampleInput" value={product.images || dataProductUpdate?.Images} /> */}
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
                    <img className="" width="150px" src={image}></img>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn-group d-flex rounded-3 mt-2">
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
      <div className="d-flex flex-wrap bg-ligth rounded justify-content-center">
        <div className="">
          <h2 className="d-flex justify-content-center">Actualización</h2>
          <label for="formGroupExampleInput">TITULO :</label>
          {newProduct.title ? `${newProduct.title}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">CATEGORIA :</label>
          {newProduct.category ? `${newProduct.category}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">SUBCATEGORIA :</label>
          {newProduct.subCategory ? `${newProduct.subCategory}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">MARCA :</label>
          {newProduct.brand ? `${newProduct.brand}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">DESCUENTO :</label>
          {newProduct.discount ? `${newProduct.discount}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">GENERO :</label>
          {newProduct.gender ? `${newProduct.gender}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">PRECIO :</label>
          {newProduct.price ? `${newProduct.price}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">COLOR :</label>
          {newProduct.Colors ? `${newProduct.Colors}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">DESCRIPCION :</label>
          {newProduct.description ? `${newProduct.description}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">IMAGENES :</label>
          <div className="d-flex flex-wrap">
            {newProduct.Images &&
              newProduct?.Images.map((image) => {
                return (
                  <div className="d-flex flex-wrap me-3">
                    <div className="">
                      <img className="" width="150px" src={image}></img>
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
