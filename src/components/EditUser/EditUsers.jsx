import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import axios from "axios";
import validationEditUsers from "./ValidationEditUsers";
import Swal from "sweetalert2";

const EditUsers = ({ setVisibleSidebar, visibleSidebar, handleSignOut , actualUser}) => {
  const [users, setUsers] = useState(null);
  const [createUser, setCreateUser] = useState(false);
  const [reload, setReload] = useState(true);
  const [userCreatedSuccess, setUserCreatedSuccess] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
  });
  const [errors, setErrors] = useState("");
  const [rolSelect, setRolSelect] = useState(false);

  useEffect(() => {
    axios(`${API_URL}/users`)
      .then(({ data }) => {
        data.Users?.sort(function(a, b) {
          return a.id - b.id;
        });
        setUsers(data.Users);
        setTimeout(() => {
          setUserCreatedSuccess(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  }, [reload]);

  const handleVisibleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };

  const spinner = () => {
    return (
      <button
        class="btn bg-body-transparent text-light  opacity-100"
        type="button"
        disabled
      >
        <span
          class="spinner-grow spinner-grow-sm text-light me-3"
          aria-hidden="true"
        ></span>
        <span class="visually me-1" role="status">
          Espere...
        </span>
      </button>
    );
  };

  const handleEdition = (user) => {
    if (user.externalSignIn) {
      Swal.fire({
        title: "No se permite editar usuarios externos",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
        },
        hideClass: {
          popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
        },
      });
    } else {
      if (
        (actualUser.rol === "admin" && user.rol === "client") ||
        (actualUser.rol === "super_admin" && user.rol === "admin" || user.rol === "client")
      ) {
        Swal.fire({
          title: `Ingrese nueva contraseña para ${user.firstName}`,
          input: "text",
          width:"300px",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.value !== "") {
            let objApi = {
              sendAdmin: true,
              newPassword: result.value,
            };
            axios
              .put(`${API_URL}/user/${user.id}/password`, objApi)
              .then(({ data }) => {
                Swal.fire({
                  icon: "success",
                  title: data.message,
                  text: `Nuevo Password: \ ${result.value}`,
                  timer: 1500,
                  showConfirmButton: false,
                });
              })
              .catch((err) => console.log(err));
          } else {
            Swal.fire({
              text: "Ingrese una contraseña",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
        Swal.fire({
          text: "No tiene permiso para esa accion.",
          timer: 1500,
          showConfirmButton: false,
          icon: "warning",
        });
      }
    }
  };
  const handleDelete = (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn",
        cancelButton: "btn",
      },
      buttonsStyling: true,
    });
      swalWithBootstrapButtons
        .fire({
          title: `Desactivar la cuenta de ${user.firstName}?`,
          text: "El usuario tendra que reactivar su cuenta",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Desactivar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            let objDelete = { active: false };
            axios
              .put(`${API_URL}/user/${user.id}`, objDelete)
              .then(({ data }) => {
                swalWithBootstrapButtons.fire({
                  title: "Cuenta Desactivada",
                  text: "",
                  icon: "success",
                  timer: 1000,
                  showConfirmButton: false,
                });
                setReload(!reload);
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Operacion Cancelada",
              text: "No se realizaron cambios ",
              icon: "error",
            });
          }
        });
  };
  const handleShowCreateuser = () => {
    setCreateUser(!createUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors(validationEditUsers({ ...user, [name]: value }, name));
  };

  const handleRol = (e) => {
    setUser({ ...user, rol: e.target.id });
  };

  const hanldeSumbit = (e) => {
    e.preventDefault();

    let userCreate = {
      firstName: user.name,
      email: user.email,
      rol: user.rol,
      password: user.password,
    };
    axios
      .post(`${API_URL}/userRegister`, userCreate)
      .then(({ data }) => {
        setUserCreatedSuccess(true);
        handleReload();
      })
      .catch((err) => console.log(err));
  };

  const handleReload = () => {
    setReload(!reload);
    setUser({
      name: "",
      email: "",
      password: "",
      rol: "",
    });
  };

  const handleChangeRol = async (user) => {
    const inputOptions = new Promise((resolve) => {
        resolve({
          "Client": "Cliente",
          "Admin": "Admin",
          "Super_admin": "Super_admin"
        });
    });
    const { value: rol } = await Swal.fire({
      title: "Seleccione Rol",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Seleccione alguna opcion!";
        }
      }
    });
    if (rol) {
      axios.put(`${API_URL}/user/${user.id}`, {rol:rol.toLowerCase()})
      .then(({data})=> {
        setReload(!reload)
          Swal.fire({ 
            icon:"succes",
            title: data.message,
           });
      }).catch((err)=> console.log(err))
    }
    
  }

  const handleEditUser = (user,e) => {
    if (validationPrivileges(user)){

      switch (e.target.id){
        case "contraseña": {
          handleEdition(user,e)
          break;
        }
        case "desactivar":{
          handleDelete(user);
          break;
        }
        case "rol":{
          handleChangeRol(user);
          setRolSelect(true)
          break;
        }
      }
    }else {
      Swal.fire({
        text: "Permiso Denegado.",
        timer: 1500,
        showConfirmButton: false,
        icon: "warning",
        width:"200px"
      });
    }
  }

  const validationPrivileges = (user) => {
    if (
      (actualUser.rol === "admin" &&
        user.rol === "client" &&
        user.rol !== "super_admin") ||
      (actualUser.rol === "super_admin" &&
        (user.rol === "admin" || user.rol === "client"))
    )
      return true;
    else return false;
  };

  return (
    <div>
      {/* INICIO NAVBAR */}
      <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100">
        <div className="">
          <button
            type="button"
            className="btn btn-ligth btn-s"
            onClick={handleVisibleSidebar}
          >
            <i className="bi bi-list fs-3"></i>
          </button>
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-ligth btn-s fs-5"
            onClick={handleShowCreateuser}
          >
            <i class="bi bi-person-fill-add fs-3 text-success"></i>
          </button>
        </div>
        <div className="me-auto">
          <button
            className="btn ms-1"
            onClick={handleReload}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-title="Tooltip on bottom"
          >
            <i className="bi bi-arrow-counterclockwise fs-4"></i>
          </button>
        </div>
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn bg-body-secondary border-secondary rounded dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {actualUser?.firstName ? actualUser?.firstName : "Admin"}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" onClick={handleSignOut}>
            <li onClick={handleSignOut}>
              <a class="dropdown-item" href="#" onClick={handleSignOut}>
                Cerrar Sesion
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* FIN NAVBAR */}
      {createUser && (
        <div className="w-75 d-flex flex-column align-content-center align-items-center mx-auto my-3 bg-body-secondary rounded-4">
          <div className="mb-2 text-secondary mt-2">Alta Usuario</div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              Nombre
            </span>
            <input
              type="text"
              name="name"
              value={user.name}
              className={
                errors.name
                  ? "form-control border-danger border-3 opacity-75 border-2 rounded-2"
                  : "form-control rounded-2"
              }
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
            <div className="dropdown ms-2 d-flex">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seleccione Rol
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    name="rol"
                    id="client"
                    className="dropdown-item"
                    href="#"
                    onClick={handleRol}
                  >
                    Cliente <i class="bi bi-person-circle ms-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="rol"
                    id="admin"
                    className="dropdown-item"
                    href="#"
                    onClick={handleRol}
                  >
                    Admin{" "}
                    <i className="bi bi-bookmark-star text-warning ms-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="rol"
                    id="super_admin"
                    className={actualUser.rol === "admin" ? "dropdown-item disabled" : "dropdown-item"}
                    href="#"
                    onClick={handleRol}
                  >
                    Super Admin <i className="bi bi-star text-warning ms-1"></i>
                  </a>
                </li>
              </ul>
            </div>
            {user.rol === "client" ? (
              <i class="bi bi-person-circle ms-2 fs-5"></i>
            ) : user.rol === "admin" ? (
              <i className="bi bi-bookmark-star text-warning ms-2 fs-5"></i>
            ) : (
              user.rol === "super_admin" && (
                <i className="bi bi-star text-warning ms-2 fs-5"></i>
              )
            )}
          </div>
          <div class="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              Contraseña
            </span>
            <input
              type="text"
              name="password"
              value={user.password}
              className={
                errors.password
                  ? "form-control border-danger border-3 opacity-75 border-2 rounded-2"
                  : "form-control rounded-2"
              }
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
          </div>
          <div class="input-group mb-3 w-50 ">
            <input
              type="text"
              name="email"
              value={user.email}
              className={
                errors.email
                  ? "form-control border-danger opacity-75 border-3 rounded-2"
                  : "form-control rounded-2"
              }
              placeholder="Email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={handleChange}
            />
            {/* <span className="input-group-text" id="basic-addon2">
              @sportvibe.com
            </span> */}
          </div>
          <div className="bg-light d-flex justify-content-start w-50"></div>
          <div className="d-flex mb-3">
            <button
              type="button"
              className={
                user.name &&
                user.password &&
                user.email &&
              
                user.rol !== ""
                  ? "btn btn-success"
                  : "btn btn-success disabled"
              }
              onClick={(e) => hanldeSumbit(e)}
            >
              {userCreatedSuccess ? spinner() : "Crear Usuario"}
            </button>
            {userCreatedSuccess && (
              <i className="bi bi-check-lg text-success fs-5 ms-3 my-auto"></i>
            )}
          </div>
        </div>
      )}
      <div className="mt-2 justify-content-center d-flex w-100">
        <div className="w-75">
          <div className="d-flex justify-content-center bg-secondary-subtle p-2 rounded fw-semibold">
            Lista de Usuarios
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle bg-ligth w-100">
              <thead>
                <tr>
                  <th scope="col" className="ps-4">
                    #
                  </th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col" className="ps-4">
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {users &&
                  users.map((user) => (
                    <tr>
                      <th scope="row1" className="ps-4">
                        {user.id}
                      </th>
                      <td scope="row">{user.firstName}</td>
                      <td scope="row">{user.email}</td>
                      <td scope="row">{user.rol}</td>
                      <td scope="row">
                        {user.active === true ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <div>
                        <div class="btn-group">
                            <button type="button" class="btn bg-success-subtle"><i className="bi bi-pencil-square fs-5"></i></button>
                            <button type="button" class="btn bg-dark-subtle dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                              <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a id="contraseña" onClick={(e)=>handleEditUser(user,e)} class="dropdown-item" href="#">Cambiar Contraseña</a></li>
                              <li><a id="desactivar" onClick={(e)=>handleEditUser(user,e)} class="dropdown-item" href="#">Desactivar Cuenta</a></li>
                              <li><a id="rol" onClick={(e)=>handleEditUser(user,e)} class="dropdown-item" href="#">Cambiar Rol</a></li>
                            </ul>
                          </div>     
                          </div>
                      </td>
                      {!rolSelect ? null : ()=>handleChangeRol(user)}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="progress sticky-bottom">
        <div
          class="progress-bar bg-success w-25 opacity-25 sticky-bottom"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-info w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-warning w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-danger w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-success w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-info w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-warning w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div
          class="progress-bar bg-danger w-25 opacity-25"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      {errors.name && (
        <div
          className="position-fixed alert alert-danger w-20 sticky-bottom"
          role="alert"
        >
          <div className="d-flex justify-content-center fs-5">
            {errors.name}
            <i className="bi bi-exclamation-octagon fs-5 ms-2"></i>
          </div>
        </div>
      )}
      {errors.password && (
        <div
          className="position-fixed alert alert-danger w-20 sticky-bottom"
          role="alert"
        >
          <div className="d-flex justify-content-center fs-5">
            {errors.password}
            <i className="bi bi-exclamation-octagon fs-5 ms-2"></i>
          </div>
        </div>
      )}
      {errors.email && (
        <div
          className="position-fixed alert alert-danger w-20 sticky-bottom"
          role="alert"
        >
          <div className="d-flex justify-content-center fs-5">
            {errors.email}
            <i className="bi bi-exclamation-octagon fs-5 ms-2"></i>
          </div>
        </div>
      ) ||
      user.name && user.password  && !user.rol && (
        <div
          className="position-fixed alert alert-danger w-20 sticky-bottom"
          role="alert"
        >
          <div className="d-flex justify-content-center fs-5">
            <p>Seleccione un rol</p>
            <i className="bi bi-exclamation-octagon fs-5 ms-2"></i>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EditUsers;
