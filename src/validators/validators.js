export const required = value => {
    if (value) return undefined;
    return 'Данное поле обязательно для заполнения!';
}