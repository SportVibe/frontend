import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import styles from "./AdminDashBoard.module.css";
import ProductForm from "../ProductForm/ProductForm";
import ProductPrueba from "../ProductForm/ProductPrueba";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
import ReviewsAdmin from "../ReviewsAdmin/ReviewsAdmin"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserAction } from "../../redux/actions";
import EditUsers from "../EditUser/EditUsers";
import Metrics from "../Metrics/Metrics";

function AdminDashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [sidebarRender, setSidebarRender] = useState("productos");
  const [visibleSidebar, setVisibleSidebar] = useState(true);
  const [active,setActive] = useState(); // muestra menu activo del sidebar
  const [actualUser, setActualUser] = useState(""); // Trae el usuario logueado de localStorage
  
 

  async function handleSignOut() {
    try {
      // reseteamos la data a renderizar y el local storage y automáticamente eso nos redirige al home.
      localStorage.removeItem('adminUser');
      dispatch(getCurrentUserAction(null));
      // y nos aseguramos de irnos al home ya que hicimos un log out.
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    let loguedUser = JSON.parse(localStorage.getItem("adminUser"));
    setActualUser(loguedUser);
  }, []); 

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

 return (
    <div className="d-flex min-vh-100 w-100">
      {visibleSidebar && <Sidebar setActive={setActive} active={active} setSidebarRender={setSidebarRender} />}
      <div className="bg-body-tertiary w-100">
        {sidebarRender === "productos" && (
          <div className={selectedRow ? styles.conteinerCardsHidden : styles.conteinerCards}>
            {<ProductPrueba handleSignOut={handleSignOut} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} setSelectedRow={setSelectedRow} actualUser={actualUser}/>}
          </div>
        )}
        {selectedRow &&
          <div className={sidebarRender === "nuevo" || sidebarRender === "usuarios" || sidebarRender === "comentarios" || sidebarRender === "metricas" ? styles.conteinerCardsHidden : styles.render}>
            <ProductUpdate setSelectedRow={setSelectedRow} data={selectedRow} />
          </div>}
        {sidebarRender === "nuevo" &&
            <ProductForm setActive={setActive} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} setSidebarRender={setSidebarRender} handleSignOut={handleSignOut} actualUser={actualUser}/>}
        {sidebarRender === "usuarios" && 
            <EditUsers handleSignOut={handleSignOut} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} actualUser={actualUser}/>}
        {sidebarRender === "comentarios" && 
            <ReviewsAdmin handleSignOut={handleSignOut} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} setSidebarRender={setSidebarRender} />}
        {sidebarRender === "metricas" && 
            <Metrics handleSignOut={handleSignOut} actualUser={actualUser} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar}/>}
      </div>
    </div>
  );
}

export default AdminDashBoard;

