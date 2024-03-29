import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { usersGet } from '../../../redux/usersReducer';
import DeviceContainer from './Device/DeviceContainer';

let Devices = (props) => {
    let devicesArr = [];

    for (let id in props.devices) {
        let Device = DeviceContainer(id);
        devicesArr.push(<Device key={id} />);
    }

    return (
        <div className="devices">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Категория</th>
                        <th>Инвентарный номер</th>
                        <th>Сотрудник</th>
                        <th>Дата покупки</th>
                        <th>Комментарий</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        devicesArr.length ? devicesArr :
                        <tr>
                            <td colSpan="4">
                                {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

let DevicesClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.devicesState.devices) || isEmptyObject(state.usersState.users) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories)) {
            let promiseArr = [];

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                    });

                    this.props.onMakeShortDevices();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onMakeShortDevices();
        }
    }

    render() {
        return (
            <Devices {...this.props} />
        );
    }
}

export default DevicesClassComponent;