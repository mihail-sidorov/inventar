import React from 'react';

let Select = ({
    input,
    desc,
    meta: {touched, error},
    children,
    multiple,
}) => {
    const hasError = touched && error;
    return(
        <div className={`form__field${hasError ? ' form__field_error' : ''}${multiple ? ' form__field_multiple' : ''}`}>
            <label>
                <span><span>{desc}</span></span>
                {
                    multiple ?
                    <select name={input.name} value={(typeof input.value) === 'object' ? input.value : []} multiple={multiple} onChange={input.onChange} onBlur={input.onBlur}>
                        {children}
                    </select>
                    :
                    <select name={input.name} value={input.value} onChange={input.onChange} onBlur={input.onBlur}>
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