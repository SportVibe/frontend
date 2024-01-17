import './CarouselModel.css';
import img from '../../Images/logo-Adidas.jpeg'
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FalseCard from '../FalseCard/FalseCard';
import { brandAction, genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction } from '../../redux/actions';

const CarouselModel = (prop) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [brandArray, setBrandArray] = useState(null);
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const category = useSelector((state => state.category));
    const priceFilter = useSelector((state => state.priceFilter));
    const genre = useSelector((state => state.genre));
    const sort = useSelector((state => state.sort));
    const sport = useSelector((state => state.sport));
    const discount = useSelector((state => state.discount));

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const { data } = await axios(`${API_URL}/product/brands`);
        setBrandArray(data);
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
        const newFiltersArray = [...totalFilters, category[0], { brand: id }, sport[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], discount[0], { search: search_Activity }]
        dispatch(brandAction([{ brand: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    useEffect(() => {
        getSports(); // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className="mainView" >
            <p className="DeportesTitle">{t('translation.Brands')}<span> {`(${brandArray?.length})`}</span></p>
            <div className="carouselContainer">
                {brandArray?.length ? brandArray.map((brand, i) => {
                    let brandName = brand.name;
                    let brandImage = brand.image;
                    brandName = brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase();
                    return (
                        <div id={brandName} onClick={handleFilter} key={i} className="carouselItem">
                            <div id={brandName}>
                                <img id={brandName} src={brandImage} />
                            </div>
                            <p id={brandName}>{brandName}</p>
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

export default CarouselModel;

