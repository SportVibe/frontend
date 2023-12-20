import { useEffect } from 'react';
import image from "../../Images/404.jpg"

function NotFound() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="d-flex justify-content-center bg-grey">
            <img src={image} width="1000px" alt="Error 404"></img>
        </div>

    );
};

export default NotFound;