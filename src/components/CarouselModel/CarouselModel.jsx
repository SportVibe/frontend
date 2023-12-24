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
    const property = prop.property || ['brand'];
    const [sportArray, setSportArray] = useState(property);

    async function getSports() {
        const { data } = await axios(`${API_URL}/property?property=${property}`);
        setSportArray(data);
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
            <p className="DeportesTitle">Selecciona por {t('translation.Brand')}</p>
            <div className="carouselContainer">
                {sportArray?.length ? sportArray.map((property, i) => {
                    const key = Object.keys(property)[0];
                    let value = property[key];
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    return (
                        <div id={value} onClick={handleFilter} key={i} className="carouselItem">
                            <div id={value}>
                                <img id={value} src={img} />
                            </div>
                            <p id={value}>{value}</p>
                        </div>
                    )
                }) :
                    <div className="carouselItem">
                        <div>
                            <img src={img} />
                        </div>
                        <p>{property}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default CarouselModel;


