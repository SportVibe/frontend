import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { API_URL } from "../../helpers/config";
import { loadLanguages } from "i18next";

const ProductPrueba = ({setSelectedRow, setVisibleSidebar, visibleSidebar}) => {
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
      width: "120px",
      center: "true"
    },
    {
      name: "TITULO",
      selector: (row) => row.title,
      sortable: true,
      allowOverflow: false,
      style: { fontSize: 16 },
      width: "600px",
    },
    {
      name: "STOCK",
      selector: (row) => row.stocks,
      sortable: true,
      center: "true",
      width: "120px",
      style: { fontSize: 16 },
      conditionalCellStyles: [
        {
          when: (row) => row.stocks < 40,
          style: {
            backgroundColor: "#a3584a",
            color: "black",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.stocks > 10,
          style: {
            backgroundColor: "#B2C2A9",
            color: "black",
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
      width:"115px",
      style: { fontSize: 16 },
      //width:"200px"
    },
    {
      name: "DISPONIBLE",
      selector: (row) => row.available,
      sortable: true,
      center: "true",
      width:"125px",
      style: { fontSize: 16 },
      //width:"200px"
    },
    {
      name: "COLORES",
      selector: (row) => row.colors,
      sortable: true,
      center: "true",
      style: { fontSize: 16 },
      //width: "400px",
    },
    {
      name: "PRECIO",
      selector: (row) => row.precio,
      sortable: true,
      center: "true",
      style: { fontSize: 16 },
      //width:"150px"
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
        precio: data[i].price
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
    // console.log(data);
    setSelectedRow(data)
  };

  const customStyles = {
    rows: {
      style: {
        fontSize: "17px",
        backgroundColor: "#e0e3de",
      },
    },
    cells: {
      style: {
        width: "20px",
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#e0e3de",
        '&:hover': {
          backgroundColor: '#dbdedc',
        },
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", 
        paddingRight: "8px",
        justify: "center",
        justifyContent: "center",
        fontSize: "16px",
        backgroundColor: '#afb1b0',
        '&:hover': {
          backgroundColor: '#dbdedc',
          color: "black",
          fontSize: "18px"
        },
      },
    },
  };

  const handleVisibleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  }

  return (
    <>
      <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100">
            <div className="">
            <button type="button" class="btn btn-ligth btn-s" onClick={handleVisibleSidebar}><i className="bi bi-list fs-3"></i></button>
            </div>
            <div className="d-flex  mx-auto">
            <i className="bi bi-search fs-3 me-2"></i>
              <input
                className="form-control"
                type="search"
                placeholder="Producto..."
                onChange={handleFilter}
              />
            </div>
            <div class="btn-group me-5">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Cerrar Sesion</a></li>
              </ul>
            </div>
        </nav>
        <DataTable
        responsive
        columns={columns}
        data={productRender}
        fixedHeader
        pointerOnHover
        customStyles={customStyles}
        theme="light"
        onRowClicked={handleChange}
      ></DataTable> 
    </>
  );
};

export default ProductPrueba;

