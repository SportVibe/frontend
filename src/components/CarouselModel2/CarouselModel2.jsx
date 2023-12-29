import './CarouselModel2.css';
import img from '../../Images/Running-Pons-Trainingok.webp'
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction } from '../../redux/actions';

const CarouselModel2 = (prop) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [sportArray, setSportArray] = useState(null);

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const {data} = await axios(`${API_URL}/product/sports`);
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
            <p className="DeportesTitle">{t(`translation.Sports`)}</p>
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

export default CarouselModel2;


