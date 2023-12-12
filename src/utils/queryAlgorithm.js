// Función para convertir el array de objetos en una cadena de consulta
// usamos "encodeURIComponent" para asegurarnos de que la cadena respete el formato de cadena para un endpoint
function buildQueryString(filters) {
    if (filters && filters.length) {
        return filters
            .map((filter) => {
                const key = Object.keys(filter)[0]; 
                const value = filter[key]; 
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join("&");
    }
    else return null;
}

export default buildQueryString;