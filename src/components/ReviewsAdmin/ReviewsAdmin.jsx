import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/config";



const ReviewsAdmin = ({setVisibleSidebar,visibleSidebar,setSidebarRender,handleSignOut}) => {
    const [reviews,setReviews] = useState(null);
    const [reload,setReload] = useState(true);
    
    
    useEffect(()=>{
        axios(`${API_URL}/reviews`)
        .then(({ data }) => {
            let pendingReviews = data.data.filter((reviews) => reviews.status === "pending")
            setReviews(pendingReviews);
      })
      .catch((err) => console.log(err));
  }, [reload]);

    //useEffect(()=>{handleVisibleSidebar()},[])


  const hanlderScore = (score)=>{
    if (score === 1){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score > 1 && score < 2){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-half text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score === 2){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score > 2 && score < 3){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-half text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score === 3){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score > 3 && score < 4){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-half text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if ( score === 4){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star text-primary fs-5"></i>
          </>);
      }
      if (score > 4 && score < 5){
        return (<>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-half text-primary fs-5"></i>
          </>);
      }
      if ( score === 5){
        return (
          <>
            <i className="bi bi-star-fill text-primary fs-5"></i>
            <i className="bi bi-star-fill text-primary fs-5"></i>
            <i className="bi bi-star-fill text-primary fs-5"></i>
            <i className="bi bi-star-fill text-primary fs-5"></i>
            <i className="bi bi-star-fill text-primary fs-5"></i>
          </>
        );
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
        <div className="d-flex flex-column">
            <nav className="d-flex justify-content-start align-items-center navbar navbar-ligth bg-body-secondary w-100 mb-2">
                  <button type="button" className="btn btn-ligth btn-s ms-1" onClick={handleVisibleSidebar}
                  ><i className="bi bi-list fs-3"></i>
                  </button>
                  <button 
                  className="btn ms-1" 
                  onClick={(e)=>setReload(!reload)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-title="Tooltip on bottom"
                  >
                  <i class="bi bi-arrow-counterclockwise fs-4"></i>
                  </button>
                  <div class="ms-auto btn-group">
                    <button type="button" className="btn bg-body-secondary border-secondary rounded dropdown-toggle ms-auto me-2" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                   </button>
                  <ul class="dropdown-menu dropdown-menu-end" onClick={handleSignOut}>
                  <li onClick={handleSignOut}><a class="dropdown-item" href="#" onClick={handleSignOut}>Cerrar Sesion</a></li>
                </ul>
                </div>
            </nav>
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
            <div className="d-flex flex-wrap gap-2 align-items-start align-content-start justify-content-center bg-body-tertiary min-vh-100">
                {reviews?.map((rev,i) => (
                <div className="d-flex card mt-2" id={rev.id}>
                    <div className="card-header bg-body-secondary">
                    {rev?.Product.title}
                    </div>
                  <div class="card-body flex-md-column flex-lg-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title text-secondary align-self-end mb-3">Comentario :</h5>
                        <img src={rev?.Product.Images[0]} width="80px" height="80px" className="rounded-pill"></img>
                    </div>
                    <div className="card-text fs-5 mb-5 shadow-sm rounded w-75">{rev.description}</div>
                    <div className="d-flex">
                        <button href="#" name="accepted" id={rev.id} className="btn bg-body-secondary me-1 align-self-center" onClick={(e)=>{handleAction(e)}}><i className="bi bi-hand-thumbs-up me-1"></i>Aceptar</button>
                        <button href="#" name="rejected" id={rev.id} className="btn bg-body-secondary align-self-center me-3" onClick={(e)=>{handleAction(e)}}><i className="bi bi-hand-thumbs-down me-1"></i>Rechazar</button>
                        <div className="ms-auto align-items-end">
                            <div className="justify-content-end d-flex mb-0 opacity-75">{hanlderScore(rev.score)}</div>
                            <p className="">Comentario ID : {rev.id}</p>
                        </div>
                    </div>
                </div>
              </div>
                ))
              }
            </div>
            }
        </div>
    );
};

export default ReviewsAdmin;