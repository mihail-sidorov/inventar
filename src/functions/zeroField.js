import isEmptyObject from "./isEmptyObject";

export default function zeroField(field) {
    if (field === undefined 
        || field === null 
        || (Object.prototype.toString.call(field) === '[object Array]' && field.length === 0) 
        || (Object.prototype.toString.call(field) === '[object Object]' && isEmptyObject(field)))
    {
        return true;
    }
    else return false;
}