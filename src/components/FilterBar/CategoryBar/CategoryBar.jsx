import styles from './CategoryBar.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../helpers/config';
import upperLowerCase from '../../../utils/upperLowerCase';
import { useDispatch, useSelector } from 'react-redux';
import { categoryAction, getProducts } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../Images/steps_FILL0_wght400_GRAD0_opsz24.svg';
import img2 from '../../../Images/sports_tennis_FILL0_wght400_GRAD0_opsz24.svg';
import img3 from '../../../Images/checkroom_FILL0_wght400_GRAD0_opsz24.svg';
import img4 from '../../../Images/apparel_FILL0_wght400_GRAD0_opsz24.svg';
const imgArray = [img1, img2, img3, img4];

function CategoryBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imgHover, setImgHover] = useState(false);
    const [allCategories, setAllCategories] = useState(null);
    const genre = useSelector((state => state.genre));
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const priceFilter = useSelector((state => state.priceFilter));
    const sort = useSelector((state => state.sort));
    const discount = useSelector((state => state.discount));

    function genreHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], discount[0], { search: search_Activity }, genre[0], { category: id }]
        dispatch(categoryAction([{ category: id }]));
        dispatch(getProducts(newFiltersArray));
        navigate('/search');
    }

    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
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
                        {allCategories?.map((category, i) => {
                            const index = i;
                            return (
                                <div key={i}>
                                    <img src={imgArray[index]} alt="" />
                                    <p id={category} onClick={genreHandler}>{category}</p>
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