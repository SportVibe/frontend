import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/config";
import { useNavigate } from "react-router-dom";


const ReviewsAdmin = ({setVisibleSidebar,visibleSidebar,setSidebarRender,reloadDetails,setReloadDetails}) => {
    const [reviews,setReviews] = useState(null);
    const [reload,setReload] = useState(true);
    const [detailProductsReviews , setDetailProductsReviews] = useState([]);
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        axios(`${API_URL}/reviews`)
        .then(({ data }) => {
            let pendingReviews = data.data.filter((reviews) => reviews.status === "pending")
            setReviews(pendingReviews);
            //handleDetail();
      })
      .catch((err) => console.log(err));
  }, [reload,navigate]);

    useEffect(()=>{handleVisibleSidebar()},[])

    useEffect(()=>{
        //Funcion para extraer el detalle de cada producto de la review
         async function handleDetail() {
             let arr = [];
               reviews?.forEach(async(rev)=> {
                   const result = await axios(`${API_URL}/detail/${rev.ProductId}`)
                   arr.push(result.data)
                   setDetailProductsReviews(arr)
                 })
                }
         handleDetail()
         setTimeout(()=>{setReloadDetails(!reloadDetails)},1000)
    },[reviews,reload])

  const hanlderScore = (score)=>{
    switch (score){
        case 1: return (<i className="bi bi-star text-warning"></i>)
        case 2: return (<><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i></>)
        case 3: return (<><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i></>)
        case 4: return (<><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i></>)
        case 5: return (<><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i></>)
        default: return ""
    }
  }

  const handleVisibleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  }

  const handleAction = async (e) =>{
    e.preventDefault();
    let bodyPutReview = {id: e.target.id , 
                        status : e.target.name};
    if (e.target.name === "accepted"){
        await axios.put(`${API_URL}/reviews`,bodyPutReview)
        .then((data) => 
        {setReload(!reload);
        })
        .catch((err) => console.log(err))
    }
    if (e.target.name === "rejected"){
        await axios.put(`${API_URL}/reviews`,bodyPutReview)
        .then((data) => 
        {setReload(!reload);
        })
        .catch((err) => console.log(err))
    }
}

    return (
        <div>
            <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100 ">
                <div className="">
                <button type="button" class="btn btn-ligth btn-s" onClick={handleVisibleSidebar}
                ><i className="bi bi-list fs-3"></i></button>
                </div>
            </nav>
        <div className="d-flex flex-column align-items-center bg-body-tertiary">
            {reviews?.length === 0 ? 
            Swal.fire({
                title: "No hay Comentarios Pendientes",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              })
              && setSidebarRender("productos")
            :
                reviews?.map((rev,i) => (
                <div className="card w-50 mb-3 mt-2" id={rev.id}>
                <div className="card-header fs-4 bg-dark-subtle">
                    {detailProductsReviews[i]?.data?.title}
                </div>
                <div class="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title fs-4 mb-3">Descripcion :</h5>
                  <p className="fs-6">Puntaje:  {hanlderScore(rev.score)}</p>
                  <img src={detailProductsReviews[i]?.data.Images[0]} width="100px" className="rounded-pill"></img>
                  </div>
                  <p className="card-text"><strong>{rev.description}</strong></p>
                  <div className="d-flex">
                  <a href="#" name="accepted" id={rev.id} className="btn btn-success me-1" onClick={(e)=>{handleAction(e)}}><i className="bi bi-hand-thumbs-up me-1"></i>Aceptar</a>
                  <a href="#" name="rejected" id={rev.id} className="btn btn-danger" onClick={(e)=>{handleAction(e)}}><i className="bi bi-hand-thumbs-down me-1"></i>Rechazar</a>
                  <div className="ms-auto">
                  <p className="">Comentario ID : {rev.id}</p>
                  </div>
                  </div>
                </div>
              </div>
            ))
            }
        </div>
        </div>
    );
};

export default ReviewsAdmin;