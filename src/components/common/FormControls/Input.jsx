import React from 'react';

let Input = ({
    input,
    type,
    desc,
    meta: {touched, error},
}) => {
    const hasError = touched && error;
    return(
        <div className={`form__field${hasError ? ' form__field_error' : ''}`}>
            <label><span><span>{desc}</span></span><input type={type} {...input} /></label>
            {
                hasError &&
                <div className="form__field-message">{error}</div>
            }
        </div>
    );
}

export default Input;