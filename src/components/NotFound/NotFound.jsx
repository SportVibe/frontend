<<<<<<< HEAD
=======
import { useEffect } from 'react';
>>>>>>> 8dec77adfdf281e13ed3118ae818ed73a43ac152
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