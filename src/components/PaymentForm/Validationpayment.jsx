const expRegNP = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegNumber = /^\d+$/;

const validate = (form) => {
  const errors = {};

  
  if (!form.country) errors.country = 'El país es requerido';
  if (!form.name) errors.name = 'El nombre es requerido';
  if (!form.surname) errors.surname = 'El apellido es requerido';
  if (!form.identification) errors.identification = 'El documento de identidad es requerido';
  if (!form.address) errors.address = 'La dirección es requerida';
  if (!form.city) errors.city = 'La ciudad es requerida';
  if (!form.zipCode) errors.zipCode = 'El código postal es requerido';
  if (!form.phone) errors.phone = 'El teléfono es requerido';
  else if (!expRegNumber.test(form.phone)) errors.phone = 'El teléfono no es válido';

  
  if (!form.name) errors.name = 'El nombre es requerido';
  else if (!expRegNP.test(form.name)) errors.name = 'El nombre no es válido';
  if (!form.surname) errors.surname = 'El apellido es requerido';
  else if (!expRegNP.test(form.surname)) errors.surname = 'El apellido no es válido';

  return errors;
};

export default validate;
