

const validationEditUsers = (user , input) => {
    const errors = {};
    console.log(input);
    if (input === "name"){
        if (user.name.length === 0) {errors.name = 'El campo "Nombre" no puede estar vacio'}
        if (user.name.length >= 20) {errors.name = 'Nombre : Maximo 20 caracteres'}
    }
    
    if (input === "password"){
        if (user.password.length < 5) errors.password = 'Contraseña : Minimo 5 Caracteres';
        if (user.password.length === 0) errors.password = 'Por favor agregue una contraseña';
    }
    
    if (input === "email"){
        let check = user.email.split("@");
        if (check.length === 2) errors.email = 'Por favor elimine el caracter @';
    }

    // if (input === "rol"){
    //     if (!user.rol) errors.rol = 'Por favor seleccione un rol';
    // }
    return errors
}
export default validationEditUsers;