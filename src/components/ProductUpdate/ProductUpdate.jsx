import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";

function ProductUpdate({ data, setSelectedRow }) {
  const [dataProductUpdate, setDataProductUpdate] = useState(null); //data que viene del detail del back
  const [product, setProduct] = useState(""); //guardo las modificaciones - estado intermedio
  const [isEditing, setEditing] = useState(false);
  const [newProduct, setNewProduct] = useState(""); // cuando se guardan los cambios , este es el state que envio al back (put)
  const [sizesEditing, setSizesEditing] = useState(false);
  const [sizes,setSizes] = useState([]);
  const [stock,setStock] = useState([]);
  

  useEffect(() => {
    axios(`${API_URL}/detail/${data.id}`)
      .then(({ data }) => {
        setDataProductUpdate(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    completeImages();
  }, [newProduct]);


  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
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

  const completeImages = () => {
    let images=newProduct.Images;
    let color=newProduct.Colors;
    let arr = [];
    let siz={};
    newProduct.Stocks?.map((obj) => { //Formateo la info de size y stock antes de enviar
      siz={"size":Object.keys(obj).toString(),
      "stock":Object.values(obj).toString()};
      arr.push(siz)
    })
    setNewProduct({
      ...newProduct,
      sizes:arr,
      images:images,
      color:color}) //agrego Propiedad sizes para enviar el back, paso a minuscula las propiedades images y color
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    completeImages();
    await axios.put(`${API_URL}/product/${dataProductUpdate.id}`,newProduct)
      .then((res) => {
            Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          });
        //handleClose();
      })
      .catch((err) => {
          Swal.fire({
          position: "center",
          icon: "warning",
          title: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

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
          let imgCloudinary = [...dataProductUpdate.Images, result.info.url];
          setDataProductUpdate({ ...dataProductUpdate, Images: imgCloudinary });
        }
      }
    );
    myWidget.open();
  };

  const handleSizes = (e) => {
    e.preventDefault();
    if(e.target.name === "size"){
      setSizes([e.target.value]);
    }else {
      setStock([e.target.value])
    }
    }
  

  const handleCloseSizes = (e) => {
    e.preventDefault();
    let newStocks = dataProductUpdate.Stocks.filter(
      (obj) => obj !== dataProductUpdate.Stocks[e.target.id]);
    setDataProductUpdate({ ...dataProductUpdate, Stocks: newStocks });
  };

  const handleCreateStock = (e) => { //controla boton agregar cantidad y talles | formateo de obj Stocks y sizes para put
    e.preventDefault();
    let obj={};
    for (let i=0;i<sizes.length;i++){
      obj = {...obj,[sizes[i]]:stock[i]}
    }
    setDataProductUpdate({...dataProductUpdate,Stocks:[...dataProductUpdate.Stocks,obj]})
    setSizes([]);
    setStock([]);
  }


  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="d-flex px-5">
        <form className="d-flex flex-column">
          <div
            className="form-group rounded-pill mt-2"
            style={{ backgroundColor: "#BFC9CA" }}
          >
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
              <h5>CATEGORIA</h5>
            </label>
            <select
              className="form-select"
              aria-label="category"
              name="category"
              onChange={handleChange}
            >
              <option disabled selected>
                {dataProductUpdate?.category} {"--->"} Seleccione Nueva
                Categoria
              </option>
              <option value="CALZADO">CALZADO</option>
              <option value="DEPORTE">DEPORTE</option>
              <option value="ROPA">ROPA</option>
            </select>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput">
              <h5>SUBCATEGORIA</h5>
            </label>
            <select
              className="form-select"
              aria-label="subCategory"
              name="subCategory"
              onChange={handleChange}
            >
              <option disabled selected>
                {dataProductUpdate?.subCategory} {"--->"} Seleccione Nueva
                Sub-categoria
              </option>
              <option value="ZAPATILLAS">ZAPATILLAS</option>
              <option value="BOTINES">BOTINES</option>
              <option value="ZAPATOS">ZAPATOS</option>
            </select>
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput">
              <h5>MARCA</h5>
            </label>
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              className="form-control"
              value={product.brand || dataProductUpdate?.brand}
            />
          </div>
          <div className="form-group pb-3">
            <label for="formGroupExampleInput">
              <h5>DESCUENTO</h5>
            </label>
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
            <label for="formGroupExampleInput">
              <h5>GENERO</h5>
            </label>
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
            <label for="formGroupExampleInput">
              <h5>PRECIO</h5>
            </label>
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
            <label for="formGroupExampleInput">
              <h5>COLOR</h5>
            </label>
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
            <input
              className="form-check-input "
              type="checkbox"
              role="switch"
              onClick={() => setSizesEditing(!sizesEditing)}
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              <h5>Modificar Stock y Talles</h5>
            </label>
          </div>
          {sizesEditing && (
            <div className="d-flex justify-content-center flex-column">
              <ul className="list-group w-100 h-100 rounded pb-3">
                {dataProductUpdate?.Stocks.map((size, i) => (
                  <div className="d-flex w-50 rounded">
                    <li
                      className="list-group-item bg-info bg-opacity-10 border border-info rounded-end"
                      style={{ fontSize: "18px" }}
                      id={i}>
                      {dataProductUpdate?.category === "CALZADO" ? ("Nº : " +
                        Object.keys(size) +
                        "  Stock : " +
                        Object.values(size) + " Unidades") :
                      ("Talle: " +
                        Object.keys(size) +
                        "  Stock : " +
                        Object.values(size) + " Unidades")}
                    </li>
                    <button
                      id={i}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={(e) => {
                        handleCloseSizes(e);
                      }}
                    ></button>
                  </div>
                ))}
              </ul>
              <div className="bg-ligth d-flex">
              <div className="form-group pb-3 w-25">
              {dataProductUpdate?.category === "CALZADO" || dataProductUpdate?.category === "ACCESORIOS"  ? <select
              className="form-select"
              aria-label="size"
              name="size"
              onChange={handleSizes}>
              <option disabled selected>
                Numero
              </option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="U">U</option>
              <option value="noaplica">NO APLICA</option>
            </select>
             : 
            <select
              className="form-select"
              aria-label="size"
              name="size"
              onChange={handleSizes}>
              <option disabled selected>
                Talle
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
              <option value="OTRO">OTRO</option>
              <option value="NOAPLICA">NO APLICA</option>
            </select>}
          </div>
          <div className="form-group pb-3 w-25">
            <select
              className="form-select"
              aria-label="stock"
              name="stock"
              onChange={handleSizes}
            >
              <option disabled selected>
                Cantidad
              </option>
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
          </div>

                <button type="button" className={stock.length === 0 ? "btn btn-primary btn-sm w-25 mb-3 disabled" : "btn btn-primary btn-sm w-25 mb-3"} onClick={(e)=>handleCreateStock(e)}>
                  Agregar
                </button>
            </div>
            </div>
          )}

          <div className="form-group pb-3">
            <label for="formGroupExampleInput2">
              <h5>DESCRIPCION</h5>
            </label>
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
                    <img
                      className="rounded-circle"
                      width="150px"
                      src={image}
                    ></img>
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
              Salir
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
              onClick={(e)=>handleSubmit(e)}
              className="btn btn-primary fs-5 me-2 rounded-3 mt-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div
        className={
          isEditing
            ? "d-flex flex-wrap mt-5 bg-light rounded justify-content-center border pt-5 my-5"
            : "sr-only"
        }
      >
        <div className="d-flex flex-column align-items-center">
          <h2 className="d-flex justify-content-center pb-3">
            {" "}
            <i className="bi bi-pencil-square px-2"></i>Actualización
          </h2>
          <label for="formGroupExampleInput">
            <h5>TITULO :</h5>
          </label>
          {newProduct.title ? `${newProduct.title}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>CATEGORIA :</h5>
          </label>
          {newProduct.category ? `${newProduct.category}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>SUBCATEGORIA :</h5>
          </label>
          {newProduct.subCategory ? `${newProduct.subCategory}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>MARCA :</h5>
          </label>
          {newProduct.brand ? `${newProduct.brand}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>DESCUENTO :</h5>
          </label>
          {newProduct.discount ? `${newProduct.discount}` : "Sin modificar"}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>GENERO :</h5>
          </label>
          {newProduct.gender ? `${newProduct.gender}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>PRECIO :</h5>
          </label>
          {newProduct.price ? `${newProduct.price}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>COLOR :</h5>
          </label>
          {newProduct.Colors ? `${newProduct.Colors}` : ""}
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>STOCKS :</h5>
          </label>
          <div className="d-flex">
            <ul className="list-group rounded flex-row flex-wrap">
              {newProduct.Stocks &&
                newProduct.Stocks.map((size) => (
                  <div className="d-flex rounded">
                    <li className="list-group-item bg-info bg-opacity-10 border border-info rounded-end">
                      {"Talle: " +
                        Object.keys(size) +
                        "  Stock : " +
                        Object.values(size)}
                    </li>
                  </div>
                ))}
            </ul>
          </div>
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>DESCRIPCION :</h5>
          </label>
          <div className="w-50">
            {newProduct.description ? `${newProduct.description}` : ""}
          </div>
          <br></br>
          <br></br>
          <label for="formGroupExampleInput">
            <h5>IMAGENES :</h5>
          </label>
          <div className="d-flex flex-wrap justify-content-center my-4">
            {newProduct.Images &&
              newProduct?.Images.map((image) => {
                return (
                  <div className="d-flex flex-wrap">
                    <div className="">
                      <img
                        className="rounded-circle"
                        width="150px"
                        src={image}
                      ></img>
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
