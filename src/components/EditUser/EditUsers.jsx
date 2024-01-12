import React, { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';

const EditUsers = ({setVisibleSidebar, visibleSidebar,handleSignOut}) => {

    const [users,setUsers] = useState(null);
    console.log(users);

    const handleVisibleSidebar = () => {
        setVisibleSidebar(!visibleSidebar);
      }

    useEffect(()=>{
        axios(`${API_URL}/users`)
        .then(({data}) => setUsers(data.Users))
        .catch((err) => console.log(err))
    },[])

    const handleEdition = (user) => {
        Swal.fire({
            title: `Ingrese nueva contraseña para ${user.firstName}`,
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
              try {
                const githubUrl = `
                  https://api.github.com/users/${login}
                `;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                  return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                }
                return response.json();
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              });
            }
          });      
    }
    const handleDelete = (user) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: `Confirma la eliminacion de ${user.firstName}?`,
            text: "No se podra revertir este cambio",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "Cancel",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Usuario Borrado",
                text: "",
                icon: "success"
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Operacion Cancelada",
                text: "No se realizaron cambios ",
                icon: "error"
              });
            }
          });
    }
    return (
        <div>
        <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100">
        <div className="">
          <button
            type="button"
            class="btn btn-ligth btn-s"
            onClick={handleVisibleSidebar}
          ><i className="bi bi-list fs-3"></i></button>
        </div>
        <div class="btn-group me-2">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </button>
          <ul class="dropdown-menu dropdown-menu-end" onClick={handleSignOut}>
            <li onClick={handleSignOut}><a class="dropdown-item" href="#" onClick={handleSignOut}>Cerrar Sesion</a></li>
          </ul>
        </div>
      </nav>
        <div className='mt-2 justify-content-center d-flex w-100'>
            <div className='w-75'>
            <div className='d-flex justify-content-center bg-secondary-subtle p-2 rounded fw-semibold'>Gestion Usuarios</div>
        <table className="table table-striped bg-ligth w-100">
         <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th scope="col">Estado</th>
      <th scope="col" className='ps-4'>Editar</th>
      
    </tr>
  </thead>
  <tbody className=''>
    {users && users.map ((user)=>
    <tr className=''>
      <th scope="row1">{user.id}</th>
      <td scope="row">{user.firstName}</td>
      <td scope="row">{user.email}</td>
      <td scope="row">{user.rol}</td>
      <td scope="row">{user.active === true ? "Activo" : "Inactivo"}</td>
      <td>
        <button type="button" className="btn btn-outline-primary border me-1 mb-0 mt-0" onClick={()=>handleEdition(user)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-pencil-square"></i></button>
        <button type="button" className="btn btn-outline-danger border" onClick={()=>handleDelete(user)}><i className="bi bi-person-fill-dash"></i></button>
      </td>
    </tr>
    )}
  </tbody>
</table>
</div>
        </div>
        </div>
    );
};

export default EditUsers;