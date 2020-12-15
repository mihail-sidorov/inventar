import React from 'react';
import { withRouter } from 'react-router-dom';
import isEmptyObject from '../../../functions/isEmptyObject';
import { devicesGet } from '../../../redux/devicesReducer';

let UserDevices = (props) => {
    let userDevices = [];

    for (let prop in props.userDevices) {
        userDevices.push(
            <tr key={prop}>
                <td>{props.userDevices[prop].model}</td>
                <td>{props.userDevices[prop].price}</td>
            </tr>
        );
    }

    return (
        <div className="user-devices">
            <div className="user-devices__title">Оборудование сотрудника</div>
            <div className="user-devices__table">
                <table>
                    <tbody>
                        {userDevices}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

let UserDevicesClassComponent = class extends React.Component {
    render() {
        return (
            <UserDevices {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.devicesState.devices)) {
            let promiseArr = [];

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                    });

                    this.props.onUserIdSet(this.props.match.params.userId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onUserIdSet(this.props.match.params.userId);
        }
    }
}

let UserDevicesWithRouter = withRouter(UserDevicesClassComponent);

export default UserDevicesWithRouter;