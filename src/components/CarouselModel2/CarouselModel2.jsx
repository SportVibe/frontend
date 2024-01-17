import './CarouselModel2.css';
import img from '../../Images/Running-Pons-Trainingok.webp'
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction, sportAction } from '../../redux/actions';
import FalseCard from '../FalseCard/FalseCard';

const CarouselModel2 = (prop) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [sportArray, setSportArray] = useState(null);
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const category = useSelector((state => state.category));
    const priceFilter = useSelector((state => state.priceFilter));
    const genre = useSelector((state => state.genre));
    const sort = useSelector((state => state.sort));
    const brand = useSelector((state => state.brand));
    const discount = useSelector((state => state.discount));

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const { data } = await axios(`${API_URL}/product/sports`);
        setSportArray(data);
    }

    /* const handleFilter = (e) => {
        const id = e.target.id;
        const propertiesArray = [{ search: id }]
        // reseteamos todos los filtrso y ordenamientos
        dispatch(genreFilterAction([{ gender: '' }]));
        dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
        dispatch(priceFilterAction(['', '']));
        dispatch(searchActivity(id));

        dispatch(getProducts(propertiesArray));
        navigate('/search');
    }; */

    function handleFilter(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], { sport: id }, brand[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], discount[0], { search: search_Activity }]
        dispatch(sportAction([{ sport: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    useEffect(() => {
        getSports(); // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className="mainView" >
            <p className="DeportesTitle">{t(`translation.Sports`)}<span> {`(${sportArray?.length})`}</span></p>
            <div className="carouselContainer">
                {sportArray?.length ? sportArray.map((sport, i) => {
                    let sportName = sport.name;
                    let sportImage = sport.image;
                    sportName = sportName.charAt(0).toUpperCase() + sportName.slice(1).toLowerCase();
                    return (
                        <div id={sportName} onClick={handleFilter} key={i} className="carouselItem">
                            <div id={sportName}>
                                <img id={sportName} src={sportImage} />
                            </div>
                            <p id={sportName}>{sportName}</p>
                        </div>
                    )
                }) :
                    [1, 2, 3, 4, 5].map((brand, i) => {
                        return <FalseCard key={i} />
                    })
                }
            </div>
        </div>
    );
};

export default CarouselModel2;


