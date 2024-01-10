import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import styles from "./AdminDashBoard.module.css";
import ProductForm from "../ProductForm/ProductForm";
import UserForm from "../UserForm/UserForm";
import ProductPrueba from "../ProductForm/ProductPrueba";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
import ReviewsAdmin from "../ReviewsAdmin/ReviewsAdmin"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserAction } from "../../redux/actions";

function AdminDashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [sidebarRender, setSidebarRender] = useState("productos");
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [reloadDetails, setReloadDetails] = useState(false); // recargo imagenes y titulos de reviews de dashboard por demora de react

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
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="d-flex w-auto">
      {visibleSidebar && <Sidebar setSidebarRender={setSidebarRender} />}
      <div className=" d-flex bg-transparent w-auto">
        {sidebarRender === "productos" ? (
          <div className={selectedRow ? styles.conteinerCardsHidden : styles.conteinerCards}>
            {<ProductPrueba handleSignOut={handleSignOut} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} setSelectedRow={setSelectedRow} />}
          </div>
        ) : null}
        {selectedRow &&
          <div className={sidebarRender === "nuevo" || sidebarRender === "usuarios" || sidebarRender === "comentarios" ? styles.conteinerCardsHidden : styles.render}>
            <ProductUpdate setSelectedRow={setSelectedRow} data={selectedRow} />
          </div>}
        {sidebarRender === "nuevo" &&
          (
            <div>
              <ProductForm />
            </div>
          )}
        {sidebarRender === "usuarios" ? <UserForm /> : null}
        {sidebarRender === "comentarios" ? <ReviewsAdmin handleSignOut={handleSignOut} setVisibleSidebar={setVisibleSidebar} visibleSidebar={visibleSidebar} setSidebarRender={setSidebarRender} /> : null}
      </div>
    </div>
  );
}

export default AdminDashBoard;

