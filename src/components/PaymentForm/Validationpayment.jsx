const expRegNP = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegNumber = /^\d+$/;

const validate = (form, clickedField) => {
  const errors = {};

  if (clickedField === 'country' && !form.country) errors.country = 'El país es requerido';

  if (clickedField === 'name' || clickedField === 'surname') {
    if (!form.name) errors.name = 'El nombre es requerido';
    else if (!expRegNP.test(form.name)) errors.name = 'El nombre no es válido';
  }

  if (clickedField === 'surname') {
    if (!form.surname) errors.surname = 'El apellido es requerido';
    else if (!expRegNP.test(form.surname)) errors.surname = 'El apellido no es válido';
  }

  if (clickedField === 'identification') {
    if (!form.identification) errors.identification = 'El documento de identidad es requerido';
  }

  // Validaciones para la dirección de envío
  if (clickedField === 'address' && !form.address) errors.address = 'La dirección es requerida';
  if (clickedField === 'city' && !form.city) errors.city = 'La ciudad es requerida';
  if (clickedField === 'zipCode' && !form.zipCode) errors.zipCode = 'El código postal es requerido';
  if (clickedField === 'phone') {
    if (!form.phone) errors.phone = 'El teléfono es requerido';
    else if (!expRegNumber.test(form.phone)) errors.phone = 'El teléfono no es válido';
  }

  // Validaciones para la dirección de facturación
  if (clickedField === 'billingAddress' && !form.billingAddress) errors.billingAddress = 'La dirección de facturación es requerida';
  if (clickedField === 'billingCity' && !form.billingCity) errors.billingCity = 'La ciudad de facturación es requerida';
  if (clickedField === 'billingZipCode' && !form.billingZipCode) errors.billingZipCode = 'El código postal de facturación es requerido';

  return errors;
};

export default validate;
