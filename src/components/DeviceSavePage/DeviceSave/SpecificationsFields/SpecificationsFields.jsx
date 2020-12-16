import React from 'react';
import { Field } from 'redux-form';
import isEmptyObject from '../../../../functions/isEmptyObject';

let SpecificationsFields = (props) => {
    if (isEmptyObject(props.category)) return null;

    let formFields = [];

    for (let field in props.category.schema.properties) {
        if (props.category.schema.properties[field].enum === undefined) {
            formFields.push(
                <div className="device-save__form-field form__field" key={field}>
                    <label><span><span>{props.category.schema.properties[field].title}</span></span><Field name={`specifications_${field}`} type="text" component="input" /></label>
                </div>
            );
        }
        else {
            let options = [];

            props.category.schema.properties[field].enum.forEach((value, index) => {
                options.push(<option value={String(value)} key={index}>{value}</option>);
            });

            formFields.push(
                <div className="device-save__form-field form__field" key={field}>
                    <label>
                        <span><span>{props.category.schema.properties[field].title}</span></span>
                        <Field name={`specifications_${field}`} component="select">
                            <option></option>
                            {options}
                        </Field>
                    </label>
                </div>
            );
        }
    }

    return (
        <div className="specifications-fields">
            {formFields}
        </div>
    );
}

export default SpecificationsFields;