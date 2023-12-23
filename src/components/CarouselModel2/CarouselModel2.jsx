import './CarouselModel2.css';
import img from '../../Images/Running-Pons-Trainingok.webp'
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CarouselModel2 = (prop) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const property = prop.property || ['sport'];
    const [sportArray, setSportArray] = useState(property);

    async function getSports() {
        const { data } = await axios(`${API_URL}/property?property=${property}`);
        setSportArray(data);
    }

    function handleFilter() {
        navigate('/search');
    }

    useEffect(() => {
        getSports();
    }, []);

    return (
        <div className="mainView" >
            <p className="DeportesTitle">Selecciona por {t(`translation.Sport`)}</p>
            <div className="carouselContainer">
                {sportArray?.length ? sportArray.map((property, i) => {
                    const key = Object.keys(property)[0];
                    let value = property[key];
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    return (
                        <div onClick={handleFilter} key={i} className="carouselItem">
                            <div>
                                <img src={img} />
                            </div>
                            <p>{value}</p>
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

export default CarouselModel2;


