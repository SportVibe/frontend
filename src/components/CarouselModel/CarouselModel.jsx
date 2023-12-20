import './CarouselModel.css';
import img from '../../Images/Running-Pons-Trainingok.webp'

const CarouselModel = () => {

    return (
        <div className="mainView" >
            <p className="DeportesTitle">Deportes</p>
            <div className="carouselContainer">
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
                <div className="carouselItem">
                    <div>
                        <img src={img} />
                    </div>
                    <p>deporte</p>
                </div>
            </div>
        </div>
    );
};

export default CarouselModel;


