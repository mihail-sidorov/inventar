import React from 'react';
import { Field } from 'redux-form';
import isEmptyObject from '../../../../functions/isEmptyObject';

let SubDevices = (props) => {
    let subDevicesArr = [];

    for (let prop in props.subDevices) {
        subDevicesArr.push(
            <div className="device-save__form-field form__field" key={prop}>
                <label>
                    {props.brands[props.subDevices[prop].brand_id].brand + ' ' + props.subDevices[prop].model}
                    <Field name={`sub-device-${prop}`} component="input" type="checkbox" />
                </label>
            </div>
        );
    }

    return subDevicesArr;

}

let SubDeviceClassComponent = class extends React.Component {
    setDefaultSubDevices() {
        if (!isEmptyObject(this.props.subDevices)) {
            for (let prop in this.props.subDevices) {
                if (this.props.subDevices[prop].parent_id !== null) {
                    this.props.change(`sub-device-${prop}`, true);
                }
            }
        }
    }

    componentDidMount() {
        this.setDefaultSubDevices();
    }

    componentDidUpdate() {
        this.setDefaultSubDevices();
    }

    render() {
        return(
            <SubDevices {...this.props} />
        );
    }
}

export default SubDeviceClassComponent;