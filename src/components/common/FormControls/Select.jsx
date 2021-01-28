import React from 'react';

let Select = ({
    input,
    desc,
    meta: {touched, error},
    children
}) => {
    const hasError = touched && error;
    return(
        <div className={`form__field${hasError ? ' form__field_error' : ''}`}>
            <label>
                <span><span>{desc}</span></span>
                <select {...input}>
                    {children}
                </select>
            </label>
            {
                hasError &&
                <div className="form__field-message">{error}</div>
            }
        </div>
    );
}

export default Select;