import axios from 'axios';


// APIS EXTERNAS:

export async function allProductsApiPlatzi() {
    try {
        const { data } = await axios('https://api.escuelajs.co/api/v1/products');
        if (data.length) {
            return data;
        }
        else return null;
    } catch (error) {
        console.error({ error: error.message });
    }
}




// API DE SPORTVIBE:

export async function allProducts(value) {
    const { data } = await axios.get('http:ncjnskjnkjcd', value);
    return data;
}

export async function allUsers(value) {
    const { data } = await axios('http:ncjnskjnkjcd', value);
    return data;
}


