import styles from './GenderBox.module.css';
import img1 from '../../Images/imageskid2.jpeg';
import img2 from '../../Images/sportBoy.jpeg';
import img3 from '../../Images/deporteWoman.jpeg';
import img4 from '../../Images/novedad-tenis.webp';
import img5 from '../../Images/unisexsport.jpeg';
import { genreFilterAction, getProducts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function GenderBox() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const category = useSelector((state => state.category));
    const priceFilter = useSelector((state => state.priceFilter));
    const sort = useSelector((state => state.sort));
    const brand = useSelector((state => state.brand));
    const discount = useSelector((state => state.discount));

    function handleGender(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], { gender: id }, brand[0], priceFilter[0], priceFilter[1], sort[0], sort[1], discount[0], { search: search_Activity }]
        dispatch(genreFilterAction([{ gender: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    return (
        <div className={styles.mainView}>
            <div id='NIÑA' className={styles.itemContainer} onClick={handleGender}>
                <div id='NIÑA' className={styles.imgContainer}>
                    <img id='NIÑA' src={img1} alt="" />
                    <p>Niña</p>
                </div>
            </div>
            <div id='NIÑO' className={styles.itemContainer} onClick={handleGender}>
                <div id='NIÑO' className={styles.imgContainer}>
                    <img id='NIÑO' src={img2} alt="" />
                    <p>Niño</p>
                </div>
            </div>
            <div id='MUJER' className={styles.itemContainer} onClick={handleGender}>
                <div id='MUJER' className={styles.imgContainer}>
                    <img id='MUJER' src={img3} alt="" />
                    <p>Mujer</p>
                </div>
            </div>
            <div id='HOMBRE' className={styles.itemContainer} onClick={handleGender}>
                <div id='HOMBRE' className={styles.imgContainer}>
                    <img id='HOMBRE' src={img4} alt="" />
                    <p>Hombre</p>
                </div>
            </div>
            <div id='UNISEX' className={styles.itemContainer} onClick={handleGender}>
                <div id='UNISEX' className={styles.imgContainer}>
                    <img id='UNISEX' src={img5} alt="" />
                    <p>Unisex</p>
                </div>
            </div>
        </div>
    );
}

export default GenderBox;