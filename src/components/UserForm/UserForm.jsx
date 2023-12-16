import "./UserForm.css"
import logo from "../../Images/Logo.jpg"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import validation from "./Validation";


function UserForm() {

    const [ foto, setFoto ] = useState('')

    const [newUsers, setNewUsers] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        zipCode: '',
        email: '',
        password: '',
        image: "https://img.freepik.com/vector-premium/hombre-volante-avatar-conductor-caracter-chofer_176411-3059.jpg?w=740",
    })
    const [newErrors, setNewErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        zipCode: '',
        email: '',
        password: '',
        image: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUsers({ ...newUsers, [name]: value });
        setNewErrors(validation({ ...newUsers, [name]: value }));   
    }

    const vistaPrevia = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader()
        reader.onload = () => setFoto(reader.result)
        if(file) reader.readAsDataURL(file)

    }

    const handleSubmt = (event) => {

        event.preventDefault()

        if (newUsers.firstName === '' &&
        newUsers.lastName === '' &&
        newUsers.phoneNumber === '' &&
        newUsers.password === '' &&
        newUsers.email === '' &&
        newUsers.zipCode === '' &&
        newUsers.address === '') {
        alert("Por Favor llena los campos");
      } else if (newUsers.firstName === '') {
        alert("Falta el primer nombre. Por favor, completa el campo correspondiente.");
      } else if (newUsers.lastName === '') {
        alert("Falta el Apellido. Por favor, completa el campo correspondiente.");
      } else if (newUsers.phoneNumber === '') {
        alert("Falta el numero de telefono. Por favor, completa el campo correspondiente.");
      } else if (newUsers.address === '') {
        alert("Falta la direccion. Por favor, completa el campo correspondiente.");
      } else if (newUsers.zipCode=== '') {
        alert("Falta el codigo postal. Por favor, completa el campo correspondiente.");
      } else if (newUsers.email === '') {
        alert("Falta el email. Por favor, completa el campo correspondiente.");
      } else if (newUsers.password  === '') {
        alert("Falta la contraseña, completa el campo correspondiente.");
      } else if (newErrors.firstName !== 'Se requiere al menos un nombre' && newErrors.firstName !== '') {
        alert('Primer nombre erroneo, por favor corrige el campo correspondiente')
      } else if (newErrors.lastName !== 'Se requiere al menos un apellido' && newErrors.lastName !== '') {
        alert('Apellido erroneo, por favor corrige el campo correspondiente')
      } else if (newErrors.email !== 'Se requiere un correo' && newErrors.email !== '') {
        alert('Correo erroneo, por favor corrige el campo correspondiente')
      } else if (newErrors.phoneNumber !== 'Se requiere un numero de telefono' && newErrors.phoneNumber !== '') {
        alert('Telefono erroneo por favor corrige el campo correspondiente')
      } else if (newErrors.zipCode !== 'Se requiere un codigo postal' && newErrors.zipCode !== '') {
        alert('Codigo postal erroneo, por favor corrige el campo correspondiente')
      } else if (newErrors.address !== 'Se requiere una direccion' && newErrors.address !== '') {
        alert('Direccion erronea, por favor corrige el campo correspondiente')
      } else if (newErrors.password !== 'Se requiere un correo' && newErrors.password !== '') {
        alert('Contraseña erronea, por favor corrige el campo correspondiente')
      } else
      window.alert("Registro exitoso!")
    }

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

    return (
        <form onSubmit={handleSubmt} className="form">
            <div className="contenedorUF">
                <div className="contLogo">
                    <NavLink to={"/"}>
                        <img className="logoUF" src={logo} alt="" />
                    </NavLink>
                    
                </div>
                <div className="contenedorAgregar">
                    {foto ? (<img src={foto} alt="Not Found" className="cuadro" />) : <label className="cuadro" htmlFor="imagen"></label>}   
                    <input className="agregarFoto" type="file" id="imagen" name="image" accept="image/*" onChange={vistaPrevia}/>
                    <label htmlFor="imagen" className="agregarImagen" > agregar foto</label> 
                </div>
                <div className="contenedor1">
                    <div className="contenedor2">
                        <label className="label" htmlFor="">Primer nombre </label>
                        <input className="input" type="text" name="firstName" onChange={handleChange} value={newUsers.firstName} />
                    </div>
                       {newErrors.firstName ? <p className="messError"> {newErrors.firstName}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"  htmlFor="">Apellido </label>
                        <input className="input" type="text" name="lastName" onChange={handleChange} value={newUsers.lastName} />
                    </div>
                    {newErrors.lastName ? <p className="messError"> {newErrors.lastName}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"  htmlFor="">Número de teléfono </label>
                        <input className="input" type="text" name="phoneNumber"  value={newUsers.phoneNumber} onChange={handleChange}/>
                    </div>
                    {newErrors.phoneNumber ? <p className="messError"> {newErrors.phoneNumber}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"  htmlFor="">Dirección </label>
                        <input className="input"  type="text" name="address" value={newUsers.address} onChange={handleChange} />
                    </div>
                    {newErrors.address ? <p className="messError"> {newErrors.address}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"  htmlFor="">Código postal </label>
                        <input className="input" type="text" name="zipCode"  value={newUsers.zipCode} onChange={handleChange}/>
                    </div>
                    {newErrors.zipCode ? <p className="messError"> {newErrors.zipCode}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"  htmlFor="">Correo electrónico </label>
                        <input className="input" type="text" name="email" value={newUsers.email} onChange={handleChange} />
                    </div>
                    {newErrors.email ? <p className="messError"> {newErrors.email}</p> : <p className="puntos">...</p>}
                    <div className="contenedor2">
                        <label className="label"   htmlFor="">Contraseña </label>
                        <input className="input"  type="password" name="password" value={newUsers.password} onChange={handleChange} />
                    </div>
                    {newErrors.password ? <p className="messError"> {newErrors.password}</p> : <p className="puntos">...</p>}
                    
                </div>
                <div className="contBotonUF">
                    <button className="botonUF" type="submit" value="submit">Submit</button>
                </div>  
        </div>
     </form>
        
    );
}

export default UserForm;