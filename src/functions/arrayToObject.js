let arrayToObject = (array) => {
    let object = {};

    array.forEach((element) => {
        object[element.id] = element;
    });

    return object;
}

export default arrayToObject;