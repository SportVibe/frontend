const expRegNumber = /^\d+$/;
const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (form, clickedField) => {
  const errors = {};

  if (clickedField === 'country' && !form.country) errors.country = 'El país es requerido';

  if (clickedField === 'address' && !form.address) errors.address = 'La dirección es requerida';
  if (clickedField === 'city' && !form.city) errors.city = 'La ciudad es requerida';
  if (clickedField === 'zipCode' && !form.zipCode) errors.zipCode = 'El código postal es requerido';

  if (clickedField === 'mail') {
    if (!form.mail) errors.mail = 'El correo electrónico es requerido';
    else if (!expRegEmail.test(form.mail)) errors.mail = 'El correo electrónico no es válido';
  }

  if (clickedField === 'cel') {
    if (!form.cel) errors.cel = 'El teléfono es requerido';
    else if (!expRegNumber.test(form.cel)) errors.cel = 'El teléfono debe contener solo números';
  }

  return errors;
};

export default validate;
