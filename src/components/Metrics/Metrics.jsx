import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import { Bar } from 'react-chartjs-2';

function Metrics() {
  const [commentMetrics, setCommentMetrics] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [productMetrics, setProductMetrics] = useState({
    mostSold: null,
  });

  const calculateCommentMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews/metrics`);
      if (data) {
        const accepted = data.filter(comment => comment.status === 'accepted').length;
        const rejected = data.filter(comment => comment.status === 'rejected').length;
        const pending = data.filter(comment => comment.status === 'pending').length;
        setCommentMetrics({ accepted, rejected, pending });
      }
    } catch (error) {
      console.error('Error al obtener métricas de comentarios:', error);
    }
  };

  const calculateProductMetrics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products/metrics`);
      if (data) {
        const mostSold = data.reduce((mostSoldProduct, product) => {
          return mostSoldProduct && mostSoldProduct.sales < product.sales ? mostSoldProduct : product;
        }, null);

        setProductMetrics({ mostSold });
      }
    } catch (error) {
      console.error('Error al obtener métricas de productos:', error);
    }
  };

  useEffect(() => {
    calculateCommentMetrics();
    calculateProductMetrics();
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

  return (
    <div>
      <h2>Métricas de Comentarios</h2>
      <Bar data={commentChartData} />

      <h2>Métricas de Productos</h2>
      {productMetrics.mostSold && (
        <p>Producto más vendido: {productMetrics.mostSold.name} (Ventas: {productMetrics.mostSold.sales})</p>
      )}
    </div>
  );
}

export default Metrics;