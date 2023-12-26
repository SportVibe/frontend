const getLocalStorageData = async () => { // la llamada al local storage lo hacemos con promesa para poder usar el await y esperar a que se cargue el local storage.
    return new Promise((resolve, reject) => {
        try {
            const data = localStorage.getItem('currentUser');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export default getLocalStorageData;