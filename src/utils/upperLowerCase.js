function upperLowerCase(value) {
    if (typeof value === 'string') {
        const array = value.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' ';
        });
        return array;
    }
    return;
}

export default upperLowerCase;