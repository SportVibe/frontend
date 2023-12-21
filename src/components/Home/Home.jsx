// Home.jsx

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBar from "../FilterBar/FilterBar";
import Paginado from "../Paginado/Paginado";
import SearchResults from "../SearchResults/SearchResults";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts, responsiveNavBar } from "../../redux/actions";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const productRender = useSelector((state) => state.products);
  const search_Activity = useSelector((state => state.search));
  const totalFilters = useSelector((state => state.totalFilters));
  const sort = useSelector((state => state.sort));
  const genre = useSelector((state => state.genre));
  const priceFilter = useSelector((state => state.priceFilter));

  useEffect(() => {
    const sumFilters = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], genre[0], { search: search_Activity }]
    dispatch(getProducts(sumFilters));
    dispatch(responsiveNavBar(false));
    if (!search_Activity) {
      navigate('/')
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.mainView}>
      <div className={styles.subMainView}>
        <div className={location.pathname === '/search' ? styles.FilterBarContainer : styles.FilterBarHidden}>
          <FilterBar />
        </div>
        {productRender.data?.length > 0 ?
          <div className={styles.containerHome}>
            <div className={styles.paginado}>
              <Paginado />
            </div>
            <div className={styles.results}>
              <p>{t('translation.results')}: {productRender?.totalFilteredCount}</p>
            </div>
            <div className={styles.containerCards}>
              {productRender.data?.length > 0 && productRender.data.map((product, i) => {
                return (
                  <div key={i} className={styles.cardComponentContainer}>
                    <ProductCard productData={product} />
                  </div>
                )
              })}
            </div>
            <div className={styles.paginado}>
              <Paginado />
            </div>
          </div> :
          <div className={styles.searchNoResultsContainer}>
            <SearchResults />
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
