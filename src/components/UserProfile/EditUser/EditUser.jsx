import { useState } from "react";
import styles from "./EditUser.module.css";
import ButtonComponent from "../../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent";
import axios from "axios";
import { API_URL } from "../../../helpers/config";
import { Await } from "react-router-dom";
import Swal from "sweetalert2";

function EditUser({
  notify,
  editUserData,
  setEditUserData,
  isValidEmail,
  handleSubmit,
}) {
  const [containerHidden, setContainerHidden] = useState(true);
  const [deleteHidden, setDeleteHidden] = useState(true);
  const [password, setPassword] = useState({ p1: "", p2: "" });
  const [newPassword, setNewPassword] = useState({
    currentP: "",
    newP1: "",
    newP2: "",
  });
  let {
    id,
    externalSignIn,
    active,
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
    email,
    sendMailsActive,
  } = editUserData ?? {};
  externalSignIn = externalSignIn ? externalSignIn : "";
  id = id ? id : "";
  active = active ? active : "";
  firstName = firstName ? firstName : "";
  lastName = lastName ? lastName : "";
  phoneNumber = phoneNumber ? phoneNumber : "";
  address = address ? address : "";
  city = city ? city : "";
  country = country ? country : "";
  zipCode = zipCode ? zipCode : "";
  email = email ? email : "";
  sendMailsActive = sendMailsActive ? sendMailsActive : "";

  function handleContainerHidden(e) {
    const id = e.target.id;
    if (id === "changePassword") {
      setContainerHidden(!containerHidden);
    } else {
      setDeleteHidden(!deleteHidden);
    }
  }

  function handleChangeInput(e) {
    const id = e.target.id;
    const value = e.target.value;
    setEditUserData({ ...editUserData, [id]: value });
    console.log({ ...editUserData, [id]: value });
  }

  function handlePasswordVerify(e) {
    const id = e.target.id;
    const value = e.target.value;
    setPassword({ ...password, [id]: value });
  }

  function handleNewPassword(e) {
    const id = e.target.id;
    const value = e.target.value;
    console.log(id, value);
    setNewPassword({ ...newPassword, [id]: value });
  }

  async function handleChangePassword() {
    try {
      if (
        newPassword.newP1.trim() !== "" &&
        newPassword.newP2.trim() !== "" &&
        newPassword.newP1.trim() === newPassword.newP2.trim()
      ) {
        if (newPassword.currentP.trim() !== "") {
          const { data } = await axios.post(`${API_URL}/login`, {
            email: email,
            password: newPassword.currentP,
          });
          if (data) {
            // Aquí es donde seteamos en false el borrado lógico para mandarlo al backend.
            const response = await axios.put(`${API_URL}/user/${id}/password`, {
              currentPassword: newPassword.currentP,
              newPassword: newPassword.newP1,
            });
            if (response) {
              Swal.fire({
                icon: "success",
                text: "Nueva contraseña creada con éxito!",
              });
              setNewPassword({ currentP: "", newP1: "", newP2: "" });
            } else {
              Swal.fire({
                icon: "error",
                text: "Se produjo un error al cargar los datos!",
              });
              setNewPassword({ currentP: "", newP1: "", newP2: "" });
            }
          } else {
            setNewPassword({ currentP: "", newP1: "", newP2: "" });

            Swal.fire({
              icon: "error",
              text: "Contraseña inválida!",
            });
          }
        } else {
          setNewPassword({ currentP: "", newP1: "", newP2: "" });

          Swal.fire({ icon: "info",
            title:"Debe completar los 3 campos"});
        }
      } else {
        setNewPassword({ currentP: "", newP1: "", newP2: "" });

        Swal.fire({ icon:"error",
          title:"Las contraseñas no coinciden"});
      }
    } catch (error) {
      console.error({ error: error.message });
      setPassword({ currentP: "", newP1: "", newP2: "" });
      Swal.fire({
        icon: "error",
        text: "Contraseña inválida",
      });
    }
  }

  async function handleDelete() {
    try {
      if (
        password.p1 !== "" &&
        password.p2 !== "" &&
        password.p1 === password.p2
      ) {
        const { data } = await axios.post(`${API_URL}/login`, {
          email: email,
          password: password.p1,
        });
        if (data) {
          // Aquí es donde seteamos en false el borrado lógico para mandarlo al backend.
          setEditUserData({ ...editUserData, active: false });
          handleSubmit({ ...editUserData, active: false });
        } else {
          setPassword({ p1: "", p2: "" });

          Swal.fire({
            icon: "error",
            text: "Contraseña inválida!",
          });
        }
      } else {
        setPassword({ p1: "", p2: "" });

        Swal.fire({ icon:"error",
        title:"Las contraseñas no coinciden"});
      }
    } catch (error) {
      console.error({ error: error.message });
      setPassword({ p1: "", p2: "" });
      Swal.fire({
        icon: "error",
        text: "Contraseña inválida",
      });
    }
  }

  return (
    <div className={styles.mainView}>
      {notify && notify.userDataMissing && (
        <div className={styles.missingData}>
          <p>{notify.userDataMissing}</p>
        </div>
      )}
      <p id={styles.title}>Información de usuario:</p>
      <div className={styles.subMainView}>
        <div className={styles.inputContainer}>
          <input
            id="firstName"
            onChange={handleChangeInput}
            value={firstName}
            type="text"
            placeholder="firstName"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="lastName"
            onChange={handleChangeInput}
            value={lastName}
            type="text"
            placeholder="lastName"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="phoneNumber"
            onChange={handleChangeInput}
            value={phoneNumber}
            type="number"
            min={8}
            max={11}
            placeholder="phoneNumber"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="address"
            onChange={handleChangeInput}
            value={address}
            type="text"
            placeholder="address"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="city"
            onChange={handleChangeInput}
            value={city}
            type="text"
            placeholder="city"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="country"
            onChange={handleChangeInput}
            value={country}
            type="text"
            placeholder="country"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            id="zipCode"
            onChange={handleChangeInput}
            value={zipCode}
            type="number"
            min={5}
            max={10}
            placeholder="zipCode"
          />
        </div>
        {!externalSignIn && (
          <div className={styles.inputContainer}>
            <input
              id="email"
              className={!isValidEmail ? styles.inputContainerInvalid : ""}
              onChange={handleChangeInput}
              value={email}
              type="text"
              placeholder="email"
            />
            {!isValidEmail && (
              <p className={styles.invalidEmail}>
                Formato de correo incorrecto
              </p>
            )}
          </div>
        )}
        <div
          onClick={() => handleSubmit(false)}
          className={styles.submitButtoncontainer}
        >
          <ButtonComponent text={"Guardar cambios"} />
        </div>
        {!externalSignIn && (
          <div
            className={
              containerHidden
                ? styles.changePasswordHidden
                : styles.changePasswordContainer
            }
          >
            <p
              className={styles.p}
              id="changePassword"
              onClick={handleContainerHidden}
            >
              Cambiar contraseña
            </p>
            <div className={styles.inputPasswordContainer}>
              <div className={styles.inputContainer}>
                <input
                  value={newPassword.currentP}
                  id="currentP"
                  onChange={handleNewPassword}
                  type="password"
                  autoComplete="off"
                  placeholder="Contraseña actual"
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  value={newPassword.newP1}
                  id="newP1"
                  onChange={handleNewPassword}
                  type="password"
                  autoComplete="off"
                  placeholder="Nueva contraseña"
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  value={newPassword.newP2}
                  id="newP2"
                  onChange={handleNewPassword}
                  type="password"
                  autoComplete="off"
                  placeholder="Repita su nueva contraseña"
                />
              </div>
              <div
                onClick={handleChangePassword}
                className={styles.submitButtoncontainer}
              >
                <ButtonComponent text={"Cambiar contraseña"} />
              </div>
            </div>
          </div>
        )}
        <div
          className={
            deleteHidden
              ? styles.deleteAcountHidden
              : styles.deleteAcountContainer
          }
        >
          <p
            className={styles.p}
            id="deleteAcount"
            onClick={handleContainerHidden}
          >
            Eliminar cuenta
          </p>
          <div className={styles.inputPasswordContainer}>
            <p className={styles.BorrarCuentaP}>
              Para borrar su cuenta debe ingresar su contraseña
            </p>
            <div className={styles.inputContainer}>
              <input
                id="p1"
                onChange={handlePasswordVerify}
                value={password.p1}
                type="password"
                autoComplete="off"
                placeholder="Contraseña"
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                id="p2"
                onChange={handlePasswordVerify}
                value={password.p2}
                type="password"
                autoComplete="off"
                placeholder="Repita su contraseña"
              />
            </div>
            <div
              onClick={handleDelete}
              className={styles.submitButtoncontainer}
            >
              <ButtonComponent text={"Eliminar cuenta"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
