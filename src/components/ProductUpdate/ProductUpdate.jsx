import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";

function ProductUpdate({ data }) {
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
  return (
    <div>
      <form>
        <div className="form-group">
          <label for="formGroupExampleInput">
            ID : {dataProductUpdate?.id}
          </label>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput">TITULO</label>
          {dataProductUpdate?.title}
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
            id="formGroupExampleInput"
            value={product.subCategory || dataProductUpdate?.subCategory}
          />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">DESCRIPCION</label>
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
            return <div className="d-flex justify-content-center">
                  <img width="100px" src={image}/>
                  </div>
          })}
        </div>
      </form>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button onClick={handleSubmit} className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </div>
  );
}

export default ProductUpdate;
