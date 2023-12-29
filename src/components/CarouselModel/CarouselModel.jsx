import './CarouselModel.css';
import img from '../../Images/logo-Adidas.jpeg'
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction } from '../../redux/actions';

const CarouselModel = (prop) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [brandArray, setBrandArray] = useState(null);

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const {data} = await axios(`${API_URL}/product/brands`);
        setBrandArray(data);
    }

    const handleFilter = (e) => {
        const id = e.target.id;
        const propertiesArray = [{ search: id }]
        // reseteamos todos los filtrso y ordenamientos
        dispatch(genreFilterAction([{ gender: '' }]));
        dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
        dispatch(priceFilterAction(['', '']));
        dispatch(searchActivity(id));

        dispatch(getProducts(propertiesArray));
        navigate('/search');
    };

    useEffect(() => {
        getSports(); // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className="mainView" >
            <p className="DeportesTitle">{t('translation.Brands')}</p>
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
                    <div className="carouselItem">
                        <div>
                            <img src={img} />
                        </div>
                        <p></p>
                    </div>
                }
            </div>
        </div>
    );
};

export default CarouselModel;


