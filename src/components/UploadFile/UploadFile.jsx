import React,{ useState } from 'react';
import axios from "axios";


function UploadFile(props) {
 const svgOK = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
 <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
 <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
</svg>;
const svgBad = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>;

 const preset = "images"; //Nombre de la carpeta en cloudinary donde subimos las imagenes
 const cloud_name = "drrswxx5y"; //nombre de la nube de sportVibe
 const [responseOk,setResponseOk] = useState(false);

 
 const handleFile = (event) => {
    let arrayImage=[];
    console.log(event.target.files)
    const imagen = event.target.files[0]; //La imagen subida se guarda en esta propiedad
    const data = new FormData(); //Instanciamos FormData, permite crear pares key:value con el metodo append
    data.append("file",imagen);
    data.append("upload_preset", preset); //Nombre de la carpeta en cloudinary donde subimos las imagenes
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)  //peticion post , link y form
    .then((res) => {setResponseOk(res.status)
        arrayImage.push(res.data.secure_url.toString())
        props.setArrayImages(arrayImage)
        //props.setImages(res.data.secure_url);
        })
    .catch(err=> window.alert(err.message))
 }
    return (
        <div>
            <input type="file" onChange={handleFile}/>
            {responseOk >= 200 && responseOk < 400 ? <>{svgOK}</> : <>{svgBad}</>}
        </div>
        );
}

export default UploadFile;