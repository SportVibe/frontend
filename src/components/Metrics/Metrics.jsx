import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import { PolarArea, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ProductDetail from '../ProductDetail/ProductDetail';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Metrics = ({setVisibleSidebar, visibleSidebar, handleSignOut , actualUser}) => {
  
 const [commentMetrics, setCommentMetrics] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [productMetrics, setProductMetrics] = useState({
    mostSold: null,
    highestRated: null,
  });
  const [stars,setStars] = useState([])
  const [selectedMetric,setSelectedMetric] = useState("estado_comentarios")
  
  console.log(productMetrics);

  const [totalReviews,setTotalReviews] = useState("")
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviewsAvg, setReviewsAvg] = useState(0);
  const [reviews, setReviews] = useState(null);

      useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCommentMetrics(), fetchProductMetrics(),fetchScorestMetrics()]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchCommentMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews`);
      if (Array.isArray(data.data)) {
        const Aceptado = data.data.filter(comment => comment.status === 'accepted').length;
        const Rechazado = data.data.filter(comment => comment.status === 'rejected').length;
        const Pendiente = data.data.filter(comment => comment.status === 'pending').length;
        setCommentMetrics({Aceptado,Rechazado,Pendiente});
        setTotalReviews(data.data.length)
      }
    } catch (error) {
      console.error('Error fetching comment metrics:', error);
      setError('Error al cargar las métricas de comentarios. Inténtelo de nuevo.');
    }
  };
  
  const fetchScorestMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews`);
      if (Array.isArray(data.data)) {
        const fiveStars = data.data.filter(prod => prod.score === 5).length;
        const fourStars = data.data.filter(prod => prod.score === 4).length;
        const threeStars = data.data.filter(prod => prod.score === 3).length;
        const twoStarts= data.data.filter(prod => prod.score === 2).length;
        const oneStars = data.data.filter(prod => prod.score === 1).length;
        const zeroStars = data.data.filter(prod => prod.score === 0).length;
        setStars([fiveStars,fourStars,threeStars,twoStarts,oneStars,zeroStars])
      }
    } catch (error) {
      console.error('Error fetching comment metrics:', error);
      setError('Error al cargar las métricas de comentarios. Inténtelo de nuevo.');
    }
  };

  const fetchProductMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin`);
      if (Array.isArray(data.modifiedProducts) && data.modifiedProducts.length > 0) {
        const mostSold = data.modifiedProducts.reduce((mostSoldProduct, product) => {
          return mostSoldProduct && mostSoldProduct.sales < product.sales ? mostSoldProduct : product;
        }, null);

        const highestRated = data.modifiedProducts.reduce((highestRatedProduct, product) => {
          return highestRatedProduct && highestRatedProduct.averageScore < product.averageScore ? highestRatedProduct : product;
        }, null);

        setProductMetrics({ mostSold, highestRated });
      }
    } catch (error) {
      console.error('Error fetching product metrics:', error);
      setError('Error al cargar las métricas de productos. Inténtelo de nuevo.');
    }
  };
  
  const hanldeScore = (reviewsAvg) => {
    if (reviewsAvg === 1) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 1 && reviewsAvg < 2) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 2) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 2 && reviewsAvg < 3) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 3) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 3 && reviewsAvg < 4) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 4) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 4 && reviewsAvg < 5) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 5) {
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
  const handleReviews = async () => {
    let suma = 0;
    let promedio = 0;
    let reviewData = await axios(`${API_URL}/reviews?productId=${id}`);
    setReviews(reviewData.data.data);
    reviewData.data.data.map((review) => {
      suma = suma + review.score;
    });
    promedio = (suma / reviewData.data.data.length);
    if (promedio === 1.0 || promedio === 2.0 || promedio === 3.0 || promedio === 4.0 || promedio === 5.0) {
      promedio = parseInt(promedio);
    } else {
      promedio = Number(promedio.toFixed(1));
    }
    setReviewsAvg(promedio);
    promedio = 0;
    suma = 0;
  };

  
  const options = {
    responsive: true,
    animation:true,
    plugins: {
        title: {
        display: true,
        text: 'Metricas SportVibe',
      },
    },
    scales: {
      y :{
       min: 0,
       max: (totalReviews)
     },
  }
  };
  const options1 = {
    responsive: true,
    animation:true,
    plugins: {
        title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y :{
       min: 0,
       max: totalReviews
     },
  }
  };


  const data = {
    labels:[],
    datasets: [
      {
        label: 'Administradores de SportVibe',
        data: commentMetrics,
        backgroundColor: ['rgba(17, 122, 101, 0.5)','rgba(41, 128, 185, 0.5)','rgba(214, 137, 16, 0.5)']
      },
    ],
  };

  const estrellas=["5 Estrellas","4 Estrellas","3 Estrellas","2 Estrellas","1 Estrellas","0 Estrellas",]
  const data1 = {
    labels:estrellas,
    datasets: [
      {
        label: 'Puntuaciones reales hechas por usuarios',
        data: stars,
        backgroundColor: ['rgba(155, 89, 182, 0.5)','rgba(241, 196, 15, 0.5)','rgba(220, 118, 51, 0.5)','rgba(231, 76, 60, 0.5)','rgba(231, 76, 60, 0.5)']
      },
    ],
  };
  
  const handleVisibleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };

  const handleSelection = (e) => {
    setSelectedMetric(e.target.id)
  }
  
 
   return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 text-center bg-body-tertiary'>
      <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100">
        <div className="">
          <button
            type="button"
            class="btn btn-ligth btn-s"
            onClick={handleVisibleSidebar}
          ><i className="bi bi-list fs-3"></i></button>
        </div>
        <div class="dropdown">
          <button className="btn bg-secondary-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Metricas
          </button>
          <ul class="dropdown-menu">
            <li><a className ="dropdown-item" href="#" id="estado_comentarios" onClick={handleSelection}>Estado de Comentarios</a></li>
            <li><a className ="dropdown-item" href="#" id="puntuaciones" onClick={handleSelection}>Puntuaciones de Productos</a></li>
            {/* <li><a className ="dropdown-item" href="#" id="mas_vendido" onClick={handleSelection}>Producto mas vendido</a></li>
            <li><a className ="dropdown-item" href="#" id="mejor_puntuacion" onClick={handleSelection}>Producto con mejores Puntuaciones</a></li> */}
          </ul>
        </div>
        <div class="btn-group me-2">
          <button type="button" class="btn bg-body-secondary border-secondary rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {actualUser.firstName ? actualUser.firstName : "Admin"}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" onClick={handleSignOut}>
            <li onClick={handleSignOut}><a class="dropdown-item" href="#" onClick={handleSignOut}>Cerrar Sesion</a></li>
          </ul>
        </div>
      </nav>
      {loading ? (
        <p>Cargando métricas...</p>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {selectedMetric === "estado_comentarios" && 
          <>
          <h4 className='mt-5'>Estado de Comentarios</h4>
          <div className='w-75 d-flex justify-content-center'>
            <Bar data={data} options={options}/>
          </div>
          </>}

          {selectedMetric === "puntuaciones" &&
           <>
           <h4 className='mt-5'>Puntuaciones de los Productos</h4>
           <div className='w-75 d-flex justify-content-center'>
           <Bar data={data1} options={options1}/>
           </div>
           </>}
          </>)}

          {selectedMetric === "mas_vendido" && 
          <ProductDetail id={productMetrics.mostSold.id}/>}
    </div>
  );
};

export default Metrics;