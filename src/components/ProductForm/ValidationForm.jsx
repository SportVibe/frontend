
const validation = (product , input) => {
    const errors = {};

if (input === "title"){
    if (product.title.length === 0) {errors.title = 'El campo "Nombre" no puede estar vacio'}
    if (product.title.length >= 255) {errors.title = 'Nombre : Maximo 255 caracteres'}
}

if (input === "category"){
    if (product.category.length === 0) errors.category = 'Por favor agregue una categoria';
}

if (input === "subCategory"){
    if (product.subCategory.length === 0) errors.subCategory = 'Por favor agregue una sub-categoria';
}

if (input === "brand"){
    if (product.brand.length === 0) {errors.brand = 'El campo "Marca" no puede estar vacio'}
    if (product.brand.length >= 100) {errors.brand = 'Marca : Maximo 100 caracteres'}
}

if (input === "sizes"){
    if (product.sizes.length === 0) {errors.sizes = 'Por favor agregue talle y stock'}
}

if (input === "color"){
    if (product.color.length === 0) {errors.color = 'Por favor agregue un color'}
}

if (input === "discount"){
    if (product.discount.length === 0) errors.discount = 'El campo "Descuento" no puede estar vacio';
    if (product.discount > 100) errors.discount = 'Descuento : Maximo 100 (%)';
}

if (input === "price"){
    if (product.price === "") errors.price = 'El campo "Precio" no puede estar vacio';
    if (product.price < 1) errors.price = 'Precio : Minimo $USD 1';
}

if (input === "gender"){
    if (product.gender === "") errors.gender = 'Seleccione Genero';
}

if (input === "description"){
    if (product.description.length === 0) errors.description = 'El campo "Descripcion" no puede estar vacio';
    if (product.description > 255) errors.description = 'Descripcion : Minimo 255 Caracteres';
}

if (input === "images"){
    if (product.images.length === 0) errors.images = 'El prodcuto no puede crearse sin una imagen';
    
}

return errors
}
export default validation;