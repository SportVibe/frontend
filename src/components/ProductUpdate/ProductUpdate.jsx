import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";

function ProductUpdate({ data, setSelectedRow }) {
  const [dataProductUpdate, setDataProductUpdate] = useState(null);
  const [product, setProduct] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [newProduct,setNewProduct]=useState("");
  useEffect(() => {
    axios(`${API_URL}/detail/${data.id}`)
      .then(({ data }) => {
        setDataProductUpdate(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({...product,update:![product.update]})
    setNewProduct({...dataProductUpdate,...product})
    console.log(product,"PRODUCT MODIFICACIONES");
    console.log(newProduct,"OBJ A ENVIAR");
  };
  const handleClose = () => {
    setEditing(false);
    setNewProduct({});
    setSelectedRow("")
  }

  const handleImage = (image,event) => {
    event.preventDefault();
    console.log(dataProductUpdate.Images)
    let img = [];
    img = dataProductUpdate.Images.filter(img => img !== image)
    setNewProduct({...product,images:img})
    setDataProductUpdate({...dataProductUpdate,Images:img})
  }
  return (
    <div className="d-flex">
    <div className="d-flex">
      <form>
        <div className="form-group">
          <label for="formGroupExampleInput">
            ID : {dataProductUpdate?.id}
          </label>
        </div>
        <div className="form-group w-100">
          <label for="formGroupExampleInput">TITULO</label>
          {/* <br></br>
          NEW VALUE = {newProduct.title} */}
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
           {/* NEW VALUE = {newProduct.category} */}
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
          {/* <br></br>
           NEW VALUE =  {newProduct.subCategory} */}
          <input
            type="text"
            name="subCategory"
            onChange={handleChange}
            className="form-control"
            id="formGroupExampleInput"
            value={product.subCategory || dataProductUpdate?.subCategory}
          />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">DESCRIPCION</label>
          {/* <br></br>
          NEW VALUE = {newProduct.description} */}
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            className="form-control"
            id="formGroupExampleInput2"
            value={product.description || dataProductUpdate?.description}
          />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput"></label>
          {/* <input type="text" name="subCategory" onChange={handleChange} className="form-control" id="formGroupExampleInput" value={product.images || dataProductUpdate?.Images} /> */}
          {dataProductUpdate?.Images.map((image) => {
            return <div className="">
                  <button onClick={()=>{handleImage(image,event)}} name={image.toString()}>X</button>
                  <img width="100px" src={image}></img>
                  </div>
          })}
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel bg-primary p-10 rounded-25"
          onClick={handleClose}
        >
          Cancelar
        </button>
        <button onClick={handleSubmit} className="btn btn__primary todo-edit bg-primary p-10 rounded-25">
          Guardar
        </button>
      </div>
      </form>
     
    </div>
    <div>
      <br></br>
          {newProduct.title ? ` ==> ${newProduct.title}` : ""}
          <br></br>
          <br></br>
          <br></br>
          {newProduct.category ? `==> ${newProduct.category}` : ""}
          <br></br>
          <br></br>
          <br></br>
          {newProduct.subCategory ? `==> ${newProduct.subCategory}` : ""}
          <br></br>
          <br></br>
          <br></br>
          {newProduct.description ? `==> ${newProduct.description}` : ""}

    </div>
    </div>
  );
}

export default ProductUpdate;
