import React from 'react';
import { Field } from 'redux-form';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { required } from '../../../../validators/validators';
import Input from '../../../common/FormControls/Input';
import Select from '../../../common/FormControls/Select';

let SpecificationsFields = (props) => {
    if (isEmptyObject(props.category)) return null;

    let formFields = [];

    for (let field in props.category.schema.properties) {
        if (props.category.schema.properties[field].type === 'string' || props.category.schema.properties[field].type === 'number'
        || props.category.schema.properties[field].type === 'integer') {
            if (props.category.schema.properties[field].enum === undefined) {
                formFields.push(
                    <Field name={`specifications_${field}`} desc={props.category.schema.properties[field].title} type="text" component={Input} validate={[required]} key={field} />
                );
            }
            else {
                let options = [];
    
                props.category.schema.properties[field].enum.forEach((value, index) => {
                    options.push(<option value={String(value)} key={index}>{value}</option>);
                });
    
                formFields.push(
                    <Field name={`specifications_${field}`} desc={props.category.schema.properties[field].title} component={Select} validate={[required]} key={field}>
                        <option></option>
                        {options}
                    </Field>
                );
            }
        }
        if (props.category.schema.properties[field].type === 'array') {
            let options = [];
            props.category.schema.properties[field].items.enum.forEach((value, index) => {
                options.push(<option value={String(value)} key={index}>{String(value)}</option>);
            });

            let defaultValue = (!isEmptyObject(props.device) && props.device[`specifications_${field}`] !== undefined
            && props.device[`specifications_${field}`] !== null) ? props.device[`specifications_${field}`] : [];

            formFields.push(
                <Field name={`specifications_${field}`} multiple={true} value={[]} defaultValue={defaultValue} desc={props.category.schema.properties[field].title} component={Select} validate={[required]} key={field}>
                    {options}
                </Field>
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