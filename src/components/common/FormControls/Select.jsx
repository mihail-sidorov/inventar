import React from 'react';

let Select = ({
    input,
    desc,
    meta: {touched, error},
    children,
    multiple,
    value,
    defaultValue
}) => {
    const hasError = touched && error;
    return(
        <div className={`form__field${hasError ? ' form__field_error' : ''}${multiple ? ' form__field_multiple' : ''}`}>
            <label>
                <span><span>{desc}</span></span>
                {
                    multiple ?
                    <select {...input} multiple={multiple} value={value} defaultValue={defaultValue}>
                        {children}
                    </select>
                    :
                    <select {...input}>
                        {children}
                    </select>
                }
            </label>
            {
                hasError &&
                <div className="form__field-message">{error}</div>
            }
        </div>
    );
}

export default Select;