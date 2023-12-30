const validation = (newUsers) => {

    let newErrors = {};

    const regex = /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    const regex1 = /^(?:(?!(.)\1\1)[a-zA-Z\s])+$/;
    const regex2 = /^[A-Z][a-zA-Z\s]*$/;
    const regex3 = /^[^a-zA-Z]+$/;
    const regex4 = /\b(\w+)\b(?=.*\b\1\b)/gi;
    const regex5 = /^[a-zA-Z0-9\s\-,#]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexClave = /.\d+./;
    const regex6 = /^[0-9]+$/;

    const MIN_MAX_LENGTH = /^.{8,}$/;
    const AT_LEAST_ONE_UPPERCASE = /^(?=.*[A-Z]).+$/;
    const AT_LEAST_ONE_LOWERCASE = /^(?=.*[a-z]).+$/;
    const AT_LEAST_ONE_DIGIT = /^(?=.*\d).+$/;
    const NO_WHITESPACE = /^\S*$/;


    if (newUsers.firstName) {
        if (!regex.test(newUsers.firstName)) newErrors.firstName = 'No debe contener símbolos ni números';
        else if (!regex1.test(newUsers.firstName)) newErrors.firstName = 'Debe ser una palabra o frase válida';
        // else if (!regex2.test(newUsers.firstName)) newErrors.firstName = 'La primer letra debe ser mayuscula';
        // else if (regex4.test(newUsers.firstName)) newErrors.firstName = 'Palabra repetida';
        else newErrors.firstName = '';
    } else newErrors.firstName = 'Se requiere al menos un nombre';

    /* if (newUsers.lastName) {
        if (!regex.test(newUsers.lastName)) newErrors.lastName = 'No debe contener símbolos ni números';
        else if (!regex1.test(newUsers.lastName)) newErrors.lastName = 'Debe ser una palabra o frase válida';
        else if (!regex2.test(newUsers.lastName)) newErrors.lastName = 'La primer letra debe ser mayuscula';
        else if (regex4.test(newUsers.lastName)) newErrors.lastName = 'Palabra repetida';
        else newErrors.lastName = '';
    } else newErrors.lastName = 'Se requiere al menos un apellido'; */

    if (newUsers.phoneNumber) {
        let string = newUsers.phoneNumber.toString()
        if (!regex3.test(newUsers.phoneNumber)) newErrors.phoneNumber = 'No debe contener letras !solo numeros';
        if (!regex6.test(newUsers.phoneNumber)) newErrors.phoneNumber = 'No debe contener simbolos !solo numeros';
        else if (string.length > 21) newErrors.phoneNumber = 'Debe contener maximo 11 digitos';
        else if (string.length < 5) newErrors.phoneNumber = 'Debe contener minimo 8 digitos';
        else newErrors.phoneNumber = '';
    } else newErrors.phoneNumber = 'Se requiere un numero de telefono';

    /* if (newUsers.address) {
        if (!regex5.test(newUsers.address)) newErrors.address = 'El formato de la dirección no es válido';
        else newErrors.address = '';
    } else newErrors.address = 'Se requiere una direccion'

    if (newUsers.zipCode) {
        let string = newUsers.zipCode.toString()
        if (!regex3.test(newUsers.zipCode)) newErrors.zipCode = 'No debe contener letras';
        else if (string.length < 5) newErrors.zipCode = 'Debe contener minimo 5 digitos';
        else if (string.length > 10) newErrors.zipCode = 'Debe contener maximo 10 digitos';
        else newErrors.zipCode = '';
    } else newErrors.zipCode = 'Se requiere un codigo postal' */

    if (newUsers.email) {
        if (!regexEmail.test(newUsers.email)) newErrors.email = 'debe ser un formato de correo valido'
        else newErrors.email = '';
    } else newErrors.email = 'Se requiere un correo';

    if (newUsers.password) {
        if (!regexClave.test(newUsers.password)) newErrors.password = 'La contraseña debe contener numeros'
        else if (!MIN_MAX_LENGTH.test(newUsers.password)) newErrors.password = 'Minimo 8 caracteres'
        else if (!AT_LEAST_ONE_UPPERCASE.test(newUsers.password)) newErrors.password = 'Debe contener al menos 1 letra en mayuscula'
        else if (!AT_LEAST_ONE_LOWERCASE.test(newUsers.password)) newErrors.password = 'Debe contener al menos 1 letra en minuscula'
        else if (!NO_WHITESPACE.test(newUsers.password)) newErrors.password = 'No debe tener espacios'
        else newErrors.password = '';
    } else newErrors.password = 'Se requiere una contraseña'

    /* if (newUsers.city) {
        if (!regex.test(newUsers.city)) newErrors.city = 'No debe contener símbolos ni números';
        else if (!regex1.test(newUsers.city)) newErrors.city = 'Debe ser una palabra o frase válida';
        else if (!regex2.test(newUsers.city)) newErrors.city = 'La primer letra debe ser mayuscula';
        else if (regex4.test(newUsers.city)) newErrors.city = 'Palabra repetida';
        else newErrors.city = '';
    } else newErrors.city = 'Se requiere una ciudad';

    if (newUsers.country) {
        if (!regex.test(newUsers.country)) newErrors.country = 'No debe contener símbolos ni números';
        else if (!regex1.test(newUsers.country)) newErrors.country = 'Debe ser una palabra o frase válida';
        else if (!regex2.test(newUsers.country)) newErrors.country = 'La primer letra debe ser mayuscula';
        else if (regex4.test(newUsers.country)) newErrors.country = 'Palabra repetida';
        else newErrors.country = '';
    } else newErrors.country = 'Se requiere un País'; */

    return newErrors

};
export default validation;