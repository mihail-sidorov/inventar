import React from 'react';

let Radio = ({
    input,
    type,
    desc,
    meta,
    onClick
}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={`form__field form__field_radio${hasError ? ' form__field_error' : ''}`}>
            <label><input type={type} {...input} onClick={onClick} />{desc}</label>
            {
                hasError &&
                <div className="form__field-message">{meta.error}</div>
            }
        </div>
    );
}

export default Radio;