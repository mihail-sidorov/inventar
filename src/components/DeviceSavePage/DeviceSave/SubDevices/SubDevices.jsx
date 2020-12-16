import React from 'react';
import { Field } from 'redux-form';

let SubDevices = (props) => {
    let subDevicesArr = [];

    for (let prop in props.subDevices) {
        subDevicesArr.push(
            <div className="device-save__form-field form__field" key={prop}>
                <label>
                    <span><span>{props.brands[props.subDevices[prop].brand_id].brand + ' ' + props.subDevices[prop].model}</span></span>
                    <Field name={`sub-device-${prop}`} component="input" type="checkbox" />
                </label>
            </div>
        );
    }

    return subDevicesArr;
}

export default SubDevices;