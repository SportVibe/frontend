import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import Chart from 'chart.js/auto';
import { PolarArea, Bar } from 'react-chartjs-2';

Chart.defaults.scale = 'linear';

const Metrics = () => {
  const [commentMetrics, setCommentMetrics] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [productMetrics, setProductMetrics] = useState({
    mostSold: null,
    highestRated: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const fetchCommentMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews`);
      if (Array.isArray(data)) {
        const accepted = data.filter(comment => comment.status === 'accepted').length;
        const rejected = data.filter(comment => comment.status === 'rejected').length;
        const pending = data.filter(comment => comment.status === 'pending').length;
        setCommentMetrics({ accepted, rejected, pending });
      }
    } catch (error) {
      console.error('Error fetching comment metrics:', error);
      setError('Error al cargar las métricas de comentarios. Inténtelo de nuevo.');
    }
  };

  const fetchProductMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/product`);
      if (Array.isArray(data) && data.length > 0) {
        const mostSold = data.reduce((mostSoldProduct, product) => {
          return mostSoldProduct && mostSoldProduct.sales < product.sales ? mostSoldProduct : product;
        }, null);

        const highestRated = data.reduce((highestRatedProduct, product) => {
          return highestRatedProduct && highestRatedProduct.averageScore < product.averageScore ? highestRatedProduct : product;
        }, null);

        setProductMetrics({ mostSold, highestRated });
      }
    } catch (error) {
      console.error('Error fetching product metrics:', error);
      setError('Error al cargar las métricas de productos. Inténtelo de nuevo.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCommentMetrics(), fetchProductMetrics()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const commentChartData = {
    labels: ['Aceptados', 'Rechazados', 'Pendientes'],
    datasets: [
      {
        label: 'Comentarios',
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        data: [commentMetrics.accepted, commentMetrics.rejected, commentMetrics.pending],
      },
    ],
  };

  const productChartData = {
    labels: ['Producto más vendido', 'Mejor evaluado'],
    datasets: [
      {
        label: 'Ventas',
        backgroundColor: ['#007bff', '#ffc107'],
        data: [
          productMetrics.mostSold ? productMetrics.mostSold.sales : 0,
          productMetrics.highestRated ? productMetrics.highestRated.averageScore : 0,
        ],
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <p>Cargando métricas...</p>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h2>Métricas de Comentarios</h2>
          <PolarArea data={commentChartData} />

          <h2>Métricas de Comentarios por Estado</h2>
          <div>
            <p>Aceptados: {commentMetrics.accepted}</p>
            <p>Rechazados: {commentMetrics.rejected}</p>
            <p>Pendientes: {commentMetrics.pending}</p>
          </div>

          <h2>Métricas de Productos</h2>
          {productMetrics.mostSold ? (
            <>
              <p>Producto más vendido: {productMetrics.mostSold.title}</p>
              <p>Mejor evaluado: {productMetrics.highestRated.title} (Puntuación: {productMetrics.highestRated.averageScore})</p>
              <Bar data={productChartData} />
            </>
          ) : (
            <p>No hay datos de productos</p>
          )}
        </>
      )}
    </div>
  );
};

export default Metrics;