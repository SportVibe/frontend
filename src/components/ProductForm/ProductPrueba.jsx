import { red } from '@cloudinary/url-gen/actions/adjust';
import React, { useState ,useMemo,useCallback ,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from '../../helpers/config';



const ProductPrueba = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [productRender,setProducRender] = useState([]);
   
    const handleButtonClick = () => {
        		console.log(state)
        	};
    //const productRender = useSelector((state) => state.products);
    useEffect(()=>{
        axios("http://localhost:3005/admin")
        .then(({data}) =>{setProducRender(data.modifiedProducts)})
        .catch(err => window.alert(err))
    },[])
   

    const columns=useMemo(() => [{ 
            cell: () => 
             <button style={{maxWidth:"120px"}}type="button" onClick={handleDetail} className="btn btn-secondary">Modificar<i className="bi bi-pencil"></i></button>
            },
            {
            name:"ID",
            selector: row => row.id,
            sortable:true,
            width:"70px",
            justify:"center",
            },
            {
            name:"TITULO",
            selector: row => row.title,
            sortable:true,  
            compact:true, 
            fontSize:"30px",
            allowOverflow:false,
            style:{fontSize:20},
            width:"500px",            
        },
        {
            name:"STOCK",
            selector: row => row.stocks,
            sortable:true,
            center:"true",
            width:"120px",
            style:{fontSize:20},
            conditionalCellStyles: [
                {
                    when: row => row.stocks < 40,
                    style: {
                        backgroundColor: '#DA5050',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },{
                    when: row => row.stocks > 10,
                    style: {
                        backgroundColor: '#6DA466',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                }]
        },
        {
            name:"IMAGENES",
            selector: row => row.images,
            sortable:true,
            //width:"120px",
            center:"true",
            style:{fontSize:20},
        },
        {
            name:"DISPONIBLE",
            selector: row => row.available,
            sortable:true, 
            center:"true",
            style:{fontSize:20},
            
            },
        {
            name:"COLORES",
            selector: row => row.colors,
            sortable:true,
            center:"true",
            style:{fontSize:20},
            width:"200px"
        },      
    ],[]);

    
    const data = [];
    for (let i=0;i<productRender.length;i++){
        let colores=productRender[i].Colors.toString();
        let cont=0;
        let inStock="";
        if(productRender[i].available){
            inStock="Si";
        }else{
            inStock="No"
        }
        
     for(let j=0;j<productRender[i].Stocks.length;j++){
             cont = cont + Number((Object.values(productRender[i].Stocks[j])));
         }
        

        let obj={
            id:productRender[i].id,
            title:productRender[i].title,
            descripcion:productRender[i].descripcion,
            images:productRender[i].Images.length,
            stocks:cont,
            colors:colores,
            available:inStock,
        }
        data.push(obj)
    }

        const handleDetail = async () =>{
            const data = await axios
            .get(`${API_URL}/detail/7`)
            console.log(data.data)
            
        }
        const handleChange = useCallback(state => {
            		setSelectedRows(state.selectedRows);
            }, []);

        const customStyles = {
                rows: {
                    style: {
                        fontSize:"25px"
                     },
                },
                cells: {
                    style: {
                        width: '200px',
                        paddingLeft: '8px', // override the cell padding for data cells
                        paddingRight: '8px',
                        backgroundColor:"#99A990",
                    },
                },
                headCells: {
                    style: {
                        paddingLeft: '8px', // override the cell padding for head cells
                        paddingRight: '8px',
                        justify:"center",
                        justifyContent:"center",
                        fontSize:"18px"
                    },
                },           
                  
            };

    return (
        
            <DataTable 
            title="LISTA DE PRODUCTOS"
            responsive
            columns={columns}
            data={data}
            fixedHeader
            highlightOnHover
            pointerOnHover
            onSelectedRowsChange={handleDetail}
            customStyles={customStyles}
            theme="dark"
            maxWidth="800px"
           >
            </DataTable>
        
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
{/* <button style={{color:"",borderRadius:"10px",backgroundColor:"white"}} onClick={handleDetail}>Modificar</button> */}