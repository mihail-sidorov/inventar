export const required = value => {
    if (value instanceof Array && value.length) return undefined;
    if (!(value instanceof Array) && value !== '' && value !== 0 && value !== undefined && value !== null) return undefined;
    return 'Данное поле обязательно для заполнения!';
}