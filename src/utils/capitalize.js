function capitalize(value) {
    if (typeof value === 'string') {
        let formattedString = value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formattedString;
    }
    return;
}

export default capitalize;