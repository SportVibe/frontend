import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { API_URL } from "../../helpers/config";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
import { object } from "prop-types";


const ProductPrueba = () => {
  const [productRender, setProductRender] = useState([]);
  const [productSearch, setProductSearch] = useState([]);


  useEffect(() => {
    axios(`${API_URL}/admin`)
      .then(({ data }) => {
            let prod = formatProductTable(data.modifiedProducts);
            setProductSearch(prod);
      })
      .catch((err) => window.alert(err));
    //return setProducRender([]);
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
      justify: "center",
    },
    {
      name: "TITULO",
      selector: (row) => row.title,
      sortable: true,
      fontSize: "30px",
      allowOverflow: false,
      style: { fontSize: 20 },
      width: "500px",
    },
    {
      name: "STOCK",
      selector: (row) => row.stocks,
      sortable: true,
      center: "true",
      width: "120px",
      style: { fontSize: 20 },
      conditionalCellStyles: [
        {
          when: (row) => row.stocks < 40,
          style: {
            backgroundColor: "#DA5050",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.stocks > 10,
          style: {
            backgroundColor: "#6DA466",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "IMAGENES",
      selector: (row) => row.images,
      sortable: true,
      center: "true",
      style: { fontSize: 20 },
    },
    {
      name: "DISPONIBLE",
      selector: (row) => row.available,
      sortable: true,
      center: "true",
      style: { fontSize: 20 },
    },
    {
      name: "COLORES",
      selector: (row) => row.colors,
      sortable: true,
      center: "true",
      style: { fontSize: 20 },
      width: "200px",
    },
  ];

  const formatProductTable = (data) => {
      let dataObject = [];
      for (let i = 0; i < data.length; i++) {
        let colores = data[i].Colors.toString();
        let cont = 0;
        let inStock = "";
        if (data[i].available) {
          inStock = "Si";
        } else {
          inStock = "No";
        }
    
        for (let j = 0; j < data[i].Stocks.length; j++) {
          cont = cont + Number(Object.values(data[i].Stocks[j]));
        }
    
        let obj = {
          id: data[i].id,
          title: data[i].title,
          descripcion: data[i].description,
          images: data[i].Images.length,
          stocks: cont,
          colors: colores,
          available: inStock,
        };
        dataObject.push(obj);
      }
      setProductRender(dataObject)
      return dataObject;
  }

  const handleFilter = (event) => {
    let filter = productSearch.filter((prod) => prod.title.toLowerCase().includes(event.target.value.toLowerCase())) 
    setProductRender(filter)
  };

  const handleChange = (data) => {
    console.log(data);
  };

  const customStyles = {
    rows: {
      style: {
        fontSize: "25px",
      },
    },
    cells: {
      style: {
        width: "200px",
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        backgroundColor: "#99A990",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        justify: "center",
        justifyContent: "center",
        fontSize: "18px",
      },
    },
  };

  return (
    <>
    <nav className="navbar navbar-ligth bg-body-secondary justify-content-center w-100 ">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-tools ms-10" viewBox="0 0 16 16">
            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
          </svg> */}
            <div className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Producto..."
                aria-label="Search"
                onChange={handleFilter}
              />
            </div>
        </nav>
      <DataTable
        title="LISTA DE PRODUCTOS"
        responsive
        columns={columns}
        data={productRender}
        fixedHeader
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        theme="dark"
        maxWidth="800px"
        onRowClicked={handleChange}
      ></DataTable>
    </>
  );
};

export default ProductPrueba;

// import React from 'react';
// import { Button, ModalHeader,Modal, ModalBody } from "react-bootstrap"
// //import "/bootstrap/dist/css/bootstrap.css.min"

// const ProductPrueba = () => {
//     return (
//         <div>
//             <Button color="succes">Mostrar</Button>
//             <Modal>
//                 <ModalHeader>
//                     <ModalBody>
//                     <h1>HOLA</h1>
//                     </ModalBody>
//                 </ModalHeader>
//             </Modal>
//         </div>
//     );
// };

// export default ProductPrueba;
{
  /* <button style={{color:"",borderRadius:"10px",backgroundColor:"white"}} onClick={handleDetail}>Modificar</button> */
}
