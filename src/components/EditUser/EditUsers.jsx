import React, { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import validationEditUsers from './ValidationEditUsers';

const EditUsers = ({setVisibleSidebar, visibleSidebar,handleSignOut}) => {
    

    const [users,setUsers] = useState(null);
    const [createUser,setCreateUser] = useState(false);
    const [reload,setReload] = useState(true);
    const [userCreatedSuccess,setUserCreatedSuccess] = useState(false)
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [errors,setErrors] = useState("")

    useEffect(()=>{
        axios(`${API_URL}/users`)
        .then(({data}) => {setUsers(data.Users)
                            setTimeout(()=>{setUserCreatedSuccess(false)},9000)
                        })
        .catch((err) => console.log(err))
    },[users,reload])

    const handleVisibleSidebar = () => {
        setVisibleSidebar(!visibleSidebar);
      }

    const handleEdition = (user) => {
        if ( user.externalSignIn){
            Swal.fire({
                title: "No se permite editar usuarios externos",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        }else {
                Swal.fire({
                title: `Ingrese nueva contraseña para ${user.firstName}`,
                input: "text",
                inputAttributes: {
                  autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                showLoaderOnConfirm: true,
              }).then((result) => {
                if(result.value !== ""){
                    let objApi = {sendAdmin: true,
                        newPassword:result.value};
                    axios.put(`${API_URL}/user/${user.id}/password`,objApi)
                    .then(({data})=> {
                      Swal.fire({
                        icon: "success",
                        title: data.message,
                        text: `Nuevo Password: \ ${result.value}`,
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    })
                    .catch((err) => console.log(err))
                }else{
                      Swal.fire({
                        text: "Ingrese una contraseña",
                        timer: 1500,
                        showConfirmButton: false,
                      });}
              });      
        }
    }
    const handleDelete = (user) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn",
              cancelButton: "btn"
            },
            buttonsStyling: true
          });
          swalWithBootstrapButtons.fire({
            title: `Desactivar la cuenta de ${user.firstName}?`,
            text: "El usuario tendra que reactivar su cuenta",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Desactivar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                let objDelete = {active:false}
                axios.put(`${API_URL}/user/${user.id}`,objDelete)
                .then(({data})=>{
                     swalWithBootstrapButtons.fire({
                      title: "Cuenta Desactivada",
                      text: "",
                      icon: "success",
                      timer: 1000,
                      showConfirmButton: false,
                    });
                })
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
    const handleShowCreateuser = () => {
        setCreateUser(!createUser)
    }

    const handleChange = (e) => {
        const { name , value } = e.target;
        const input = name;
        setUser({...user, [name] : value})
        setErrors(validationEditUsers({...user, [name] : value},input))
    }

    const hanldeSumbit = (e) =>{
        e.preventDefault();
        let userCreate = {
                firstName: user.name,
                email: `${user.email}@sportvibe.com`,
                rol: "admin",
                password: user.password
        }
        axios.post(`${API_URL}/userRegister`,userCreate)
        .then(({data})=> {
            setUser({
            name:"",
            email:"",
            password:"",
        });
        setUserCreatedSuccess(true)
        })
        .catch((err)=>console.log(err))
    }

    const handleReload = () => {
        setReload(!reload);
        setUser({
            name:"",
            email:"",
            password:"",
        })
    }

    return (
        <div>
        <nav className="navbar navbar-ligth bg-body-secondary justify-content-between w-100">
        <div className="">
          <button
            type="button"
            className="btn btn-ligth btn-s"
            onClick={handleVisibleSidebar}
          ><i className="bi bi-list fs-3"></i></button>
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-ligth btn-s fs-5"
            onClick={handleShowCreateuser}
          ><i class="bi bi-person-fill-add"></i></button>
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
          <button type="button" class="btn bg-body-secondary border-secondary rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </button>
          <ul class="dropdown-menu dropdown-menu-end" onClick={handleSignOut}>
            <li onClick={handleSignOut}><a class="dropdown-item" href="#" onClick={handleSignOut}>Cerrar Sesion</a></li>
          </ul>
        </div>
      </nav>
      {createUser && 
      <div className='w-100 d-flex flex-column align-items-center my-3'>
        <div className='mb-2 text-secondary'>Alta Usuario</div>
            <div class="input-group mb-3 w-50">
                    <span className="input-group-text" id="basic-addon1">Nombre</span>
                    {errors.name ? <input type="text" name="name" value={user.name} className="form-control border-danger border-3 opacity-75 border-2" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                    :
                    <input type="text" name="name" value={user.name} className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />}   
            </div>
            <div class="input-group mb-3 w-50">
                    <span className="input-group-text" id="basic-addon1">Contraseña</span>
                    {errors.password ?<input type="text" name="password" value={user.password} className="form-control border-danger border-3 opacity-75 border-2" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} /> 
                    :
                    <input type="text" name="password" value={user.password} className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} /> }
                    
            </div>
            <div class="input-group mb-3 w-50 ">
                {errors.email ? <input type="text" name="email" value={user.email} className="form-control border-danger border-3 opacity-75 border-2" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange}/>
                :
                <input type="text" name="email" value={user.email} className="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange}/> }
                    
                    <span className="input-group-text" id="basic-addon2">@sportvibe.com</span>
            </div>
            <div className='d-flex'>
                {user.name && user.password && user.email && Object.keys(errors).length === 0 ? <button type="button" className="btn btn-success"  onClick={(e)=>hanldeSumbit(e)}>Crear Usuario</button>
                : 
                <button type="button" className="btn btn-success" disabled onClick={(e)=>hanldeSumbit(e)}>Crear Usuario</button>}
            
            {userCreatedSuccess && <i className="bi bi-check-lg text-success fs-5 ms-3 my-auto"></i>}
            </div>
        </div>}
        <div className='mt-2 justify-content-center d-flex w-100'>
            <div className='w-75'>
            <div className='d-flex justify-content-center bg-secondary-subtle p-2 rounded fw-semibold'>Gestion Usuarios</div>
            <div className="table-responsive">
        <table className="table table-striped table-hover align-middle bg-ligth w-100">
         <thead>
    <tr>
      <th scope="col" className='ps-4'>#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th scope="col">Estado</th>
      <th scope="col" className='ps-4'>Editar</th>
      
    </tr>
  </thead>
  <tbody className=''>
    {users && users.map ((user)=>
    <tr>
      <th scope="row1" className='ps-4'>{user.id}</th>
      <td scope="row">{user.firstName}</td>
      <td scope="row">{user.email}</td>
      <td scope="row">{user.rol}</td>
      <td scope="row">{user.active === true ? "Activo" : "Inactivo"}</td>
      <td>
        <button type="button" className="btn btn-outline-primary border me-1 mb-0 mt-0" onClick={(e)=>handleEdition(user,e)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-pencil-square"></i></button>
        <button type="button" className="btn btn-outline-danger border" onClick={()=>handleDelete(user)}><i className="bi bi-person-fill-dash"></i></button>
      </td>
    </tr>
    )}
  </tbody>
</table>
</div>
</div>
        </div>
        {errors.name && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.name}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.password && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.password}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
      {errors.email && 
                <div className="position-fixed alert alert-danger w-20 sticky-bottom" role="alert">
                <div className="d-flex justify-content-center fs-5">{errors.email}<i className="bi bi-exclamation-octagon fs-5 ms-2"></i></div>
            </div>
      }
        </div>
    );
};

export default EditUsers;