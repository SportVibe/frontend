
const validation = (product , input) => {
    const errors = {};
if ( input === "title"){
    if (product.title.length >= 255) errors.title = 'Nombre : Maximo 255 caracteres';
    if (product.title.length === 0) errors.title = 'El Nombre no puede estar vacio';
}

if ( input === "category"){
    if (product.category.length === 0) errors.category = 'Por favor seleccione una categoria';
}

if ( input === "subCategory"){
    if (product.subCategory.length === 0) errors.subCategory = 'Por favor seleccione una sub-categoria';
}

if ( input === "brand"){
if (product.brand.length >= 100) errors.brand = 'Marca : Maximo 100 caracteres';
if (product.brand.length === 0) errors.brand = 'El campo "Marca" no puede estar vacio';
}

if ( input === "discount"){
if (product.discount > 100) errors.discount = 'Descuento : Maximo 100 (%)';
if (product.discount.length === 0) errors.discount = 'El campo "Descuento" no puede estar vacio';
}
return errors
}
export default validation;