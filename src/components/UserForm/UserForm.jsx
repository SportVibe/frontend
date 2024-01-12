import "./UserForm.css";
import logo from "../../Images/Logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserAction } from "../../redux/actions.js";
import { API_URL } from "../../helpers/config.js";
import validation from "./Validation";
import axios from "axios";

function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputFirstName, setInputFirstName] = useState(false);
  const [inputLastName, setInputLastName] = useState(false);
  const [inputPhone, setInputPhone] = useState(false);
  const [inputAddress, setInputAddress] = useState(false);
  const [inputCity, setInputCity] = useState(false);
  const [inputCountry, setInputCountry] = useState(false);
  const [inputZipCode, setInputZipCode] = useState(false);
  const [inputEmail, setInputEmail] = useState(false);
  const [inputPassword, setInputPassword] = useState(false);
  const [inputImage, setInputImage] = useState(false);

  const [foto, setFoto] = useState("");
  const [newUsers, setNewUsers] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    email: "",
    password: "",
    image: "",
  });
  const [newErrors, setNewErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") setInputFirstName(true);
    else setInputFirstName(false);
    if (name === "lastName") setInputLastName(true);
    else setInputLastName(false);
    if (name === "phoneNumber") setInputPhone(true), Number(value);
    else setInputPhone(false);
    if (name === "address") setInputAddress(true);
    else setInputAddress(false);
    if (name === "zipCode") setInputZipCode(true), Number(value);
    else setInputZipCode(false);
    if (name === "email") setInputEmail(true);
    else setInputEmail(false);
    if (name === "password") setInputPassword(true);
    else setInputPassword(false);
    if (name === "city") setInputCity(true);
    else setInputCity(false);
    if (name === "country") setInputCountry(true);
    else setInputCountry(false);

    setNewUsers({ ...newUsers, [name]: value });
    setNewErrors(validation({ ...newUsers, [name]: value }));
  };

  const vistaPrevia = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmt = async (event) => {
    event.preventDefault();
    try {
      if (
        newUsers.firstName === "" &&
        newUsers.lastName === "" &&
        newUsers.phoneNumber === "" &&
        newUsers.password === "" &&
        newUsers.email === "" &&
        newUsers.zipCode === "" &&
        newUsers.address === "" &&
        newUsers.city === "" &&
        newUsers.country
      ) {
        Swal.fire("Por favor llena los campos!");
      } else if (newUsers.firstName === "") {
        Swal.fire(
          "Falta el primer nombre. Por favor, completa el campo correspondiente."
        );
        // } else if (newUsers.lastName === '') {
        //   alert("Falta el Apellido. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.phoneNumber === '') {
        //   alert("Falta el numero de telefono. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.address === '') {
        //   alert("Falta la direccion. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.zipCode === '') {
        //   alert("Falta el codigo postal. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.email === '') {
        //   alert("Falta el email. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.password === '') {
        //   alert("Falta la contraseña, completa el campo correspondiente.");
        // } else if (newUsers.city === '') {
        //   alert("Falta ciudad. Por favor, completa el campo correspondiente.");
        // } else if (newUsers.country === '') {
        //   alert("Falta pais, completa el campo correspondiente.");
        // } else if (newErrors.firstName !== 'Se requiere al menos un nombre' && newErrors.firstName !== '') {
        //   alert('Primer nombre erroneo, por favor corrige el campo correspondiente')
        // } else if (newErrors.lastName !== 'Se requiere al menos un apellido' && newErrors.lastName !== '') {
        //   alert('Apellido erroneo, por favor corrige el campo correspondiente')
        // } else if (newErrors.email !== 'Se requiere un correo' && newErrors.email !== '') {
        //   alert('Correo erroneo, por favor corrige el campo correspondiente')
        // } else if (newErrors.phoneNumber !== 'Se requiere un numero de telefono' && newErrors.phoneNumber !== '') {
        //   alert('Telefono erroneo por favor corrige el campo correspondiente')
        // } else if (newErrors.zipCode !== 'Se requiere un codigo postal' && newErrors.zipCode !== '') {
        //   alert('Codigo postal erroneo, por favor corrige el campo correspondiente')
        // } else if (newErrors.address !== 'Se requiere una direccion' && newErrors.address !== '') {
        //   alert('Direccion erronea, por favor corrige el campo correspondiente')
      } else if (
        newErrors.password !== "Se requiere un correo" &&
        newErrors.password !== ""
      ) {
        Swal.fire(
          "Contraseña erronea, por favor corrige el campo correspondiente"
        );
        // } else if (newErrors.city !== 'Se requiere una ciudad' && newErrors.city !== '') {
        //   alert('Ciudad erronea, por favor corrige el campo correspondiente')
        // } else if (newErrors.country !== 'Se requiere un País' && newErrors.country !== '') {
        //   alert('País erroneo, por favor corrige el campo correspondiente')
      } else {
        const { data } = await axios.post(`${API_URL}/userRegister`, newUsers);
        if (data) {
          const newCartResponse = await axios.post(`${API_URL}/shoppingCart`, {
            userId: data.user.id,
            type: "member",
          });
          const dataLogin = newCartResponse.data;
          console.log(dataLogin);
        }

        Swal.fire({
          title: data.message, // Usa el mensaje del objeto data
          icon: "info", // Cambia el icono según tus preferencias (info, warning, success, error, etc.)
        });
        const response = await axios.post(`${API_URL}/login`, {
          email: newUsers.email,
          password: newUsers.password,
        });
        const dataLogin = response.data;
        if (dataLogin) {
          localStorage.setItem("currentUser", JSON.stringify(dataLogin));
          dispatch(getCurrentUserAction(dataLogin));
        }
        setNewUsers({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          city: "",
          country: "",
          zipCode: "",
          email: "",
          password: "",
          image: "",
        });
        navigate("/");
      }
    } catch (error) {
      //console.log(error);

      Swal.fire({
        title: error.response.data.error, // Usa el mensaje del objeto data
        icon: "info", // Cambia el icono según tus preferencias (info, warning, success, error, etc.)
      });
    }
  };
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
          {foto ? (
            <img src={foto} alt="Not Found" className="cuadro" />
          ) : (
            <label className="cuadro" htmlFor="imagen"></label>
          )}
          <input
            className="agregarFoto"
            type="file"
            id="imagen"
            name="image"
            accept="image/*"
            onChange={vistaPrevia}
          />
          <label htmlFor="imagen" className="agregarImagen">
            {" "}
            agregar foto
          </label>
        </div>
        <div className="contenedor1">
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Primer nombre{" "}
            </label>
            <input
              className="input"
              type="text"
              name="firstName"
              onChange={handleChange}
              value={newUsers.firstName}
            />
          </div>
          {inputFirstName && newErrors.firstName ? (
            <p className="messError"> {newErrors.firstName}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Apellido{" "}
            </label>
            <input
              className="input"
              type="text"
              name="lastName"
              onChange={handleChange}
              value={newUsers.lastName}
            />
          </div>
          {inputLastName && newErrors.lastName ? (
            <p className="messError"> {newErrors.lastName}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Número de teléfono{" "}
            </label>
            <input
              className="input"
              type="number"
              name="phoneNumber"
              value={newUsers.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {inputPhone && newErrors.phoneNumber ? (
            <p className="messError"> {newErrors.phoneNumber}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Dirección{" "}
            </label>
            <input
              className="input"
              type="text"
              name="address"
              value={newUsers.address}
              onChange={handleChange}
            />
          </div>
          {inputAddress && newErrors.address ? (
            <p className="messError"> {newErrors.address}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Código postal{" "}
            </label>
            <input
              className="input"
              type="number"
              name="zipCode"
              value={newUsers.zipCode}
              onChange={handleChange}
            />
          </div>
          {inputZipCode && newErrors.zipCode ? (
            <p className="messError"> {newErrors.zipCode}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Correo electrónico{" "}
            </label>
            <input
              className="input"
              type="text"
              name="email"
              value={newUsers.email}
              onChange={handleChange}
            />
          </div>
          {inputEmail && newErrors.email ? (
            <p className="messError"> {newErrors.email}</p>
          ) : (
            <p className="puntos">...</p>
          )}
          <div className="contenedor2">
            <label className="label" htmlFor="">
              Contraseña{" "}
            </label>
            <input
              className="input"
              type="password"
              autoComplete="off"
              name="password"
              value={newUsers.password}
              onChange={handleChange}
            />
          </div>
          {inputPassword && newErrors.password ? (
            <p className="messError"> {newErrors.password}</p>
          ) : (
            <p className="puntos">...</p>
          )}

          <div className="contenedor2">
            <label className="label" htmlFor="">
              Ciudad{" "}
            </label>

            <input
              className="input"
              type="text"
              name="city"
              onChange={handleChange}
              value={newUsers.city}
            />
          </div>
          {inputCity && newErrors.city ? (
            <p className="messError"> {newErrors.city}</p>
          ) : (
            <p className="puntos">...</p>
          )}

          <div className="contenedor2">
            <label className="label" htmlFor="">
              País{" "}
            </label>

            <input
              className="input"
              type="text"
              name="country"
              onChange={handleChange}
              value={newUsers.country}
            />
          </div>
          {inputCountry && newErrors.country ? (
            <p className="messError"> {newErrors.country}</p>
          ) : (
            <p className="puntos">...</p>
          )}
        </div>

        <div className="contBotonUF">
          <button className="botonUF" type="submit" value="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
export default UserForm;
