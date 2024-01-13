import styles from './CategoryBar.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../helpers/config';
import upperLowerCase from '../../../utils/upperLowerCase';
import { useDispatch, useSelector } from 'react-redux';
import { brandAction, categoryAction, discountProducts, filterCounterAction, genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction, sportAction } from '../../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../../Images/steps_FILL0_wght400_GRAD0_opsz24.svg';
import img2 from '../../../Images/sports_tennis_FILL0_wght400_GRAD0_opsz24.svg';
import img3 from '../../../Images/checkroom_FILL0_wght400_GRAD0_opsz24.svg';
import img4 from '../../../Images/apparel_FILL0_wght400_GRAD0_opsz24.svg';
const imgArray = [img1, img2, img3, img4];

function CategoryBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [allCategories, setAllCategories] = useState(null);
    const category = useSelector((state => state.category));
    const genre = useSelector((state => state.genre));
    const sport = useSelector((state => state.sport));
    const brand = useSelector((state => state.brand));
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const priceFilter = useSelector((state => state.priceFilter));
    const sort = useSelector((state => state.sort));
    const discount = useSelector((state => state.discount));

    /* function categoryHandler(event) {
        const id = event.target.id; // pasamos la categoría como si fuera una búsqueda del search bar, para que pise lo que se busca con él.
        const newFiltersArray = [...totalFilters, sport[0], brand[0], priceFilter[0], priceFilter[1], sort[0], sort[1], discount[0], { search: id }, genre[0]]
        // dispatch(categoryAction([{ category: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    } */

    function categoryHandler(event) {
        const id = event.target.id; // pasamos la categoría como si fuera una búsqueda del search bar, para que pise lo que se busca con él.
        const propertiesArray = [{ search: id }];
        dispatch(genreFilterAction([{ gender: '' }]));
        dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
        dispatch(priceFilterAction(['', '']));
        dispatch(discountProducts([{ discount: 0 }]));
        dispatch(searchActivity(id));
        dispatch(categoryAction(id));
        dispatch(sportAction([{ sport: '' }]));
        dispatch(brandAction([{ brand: '' }]));
        dispatch(filterCounterAction({}));

        // el segundo valor en true del dispatch, es para indicar
        // que usaremos el backup del reducer para mantener el filtrado
        // madre de los filtros, así los items de la barra lateral de filtros no pierden su cantidad entre paréntesis.
        dispatch(getProducts(propertiesArray, true));
        if (pathname !== '/search') navigate('/search');
    }

    async function getAllCategories() {
        try {
            const { data } = await axios(`${API_URL}/product/category`);
            if (data) { // Pasamos a mayúsculas las iniciales.
                setAllCategories(upperLowerCase(data.categories));
            }
        } catch (error) {
            console.error({ error: error.message });
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.carouselContainer}>
                    <div className={styles.siderLeft}></div>
                    <div className={styles.carouselDiv}>
                        {allCategories?.map((_category, i) => {
                            const index = i;
                            return (
                                <div key={i}>
                                    <img src={imgArray[index]} alt="" />
                                    <p id={_category} onClick={categoryHandler} className={search_Activity === _category ? styles.selectedCategory : ''}>{_category}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.siderRight}></div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.otrasDiv}>
                    <p>Ver más</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryBar;