import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentNamesGet } from '../../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../../redux/locationsReducer';
import { postDepLocsGet } from '../../../redux/postDepLocsReducer';
import { usersGet } from '../../../redux/usersReducer';
import UserContainer from './User/UserContainer';

let Users = (props) => {
    let usersArr = [];

    for (let id in props.users) {
        let User = UserContainer(id);
        usersArr.push(<User key={id} />);
    }

    return (
        <div className="users">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Должность</th>
                        <th>Местонахождение</th>
                        <th>Отдел</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersArr.length ? usersArr :
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

let UsersClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.postDepLocsState.postDepLocs)
        || isEmptyObject(state.locationsState.locations) || isEmptyObject(state.departmentsLocationsState.departmentsLocations)
        || isEmptyObject(state.departmentNamesState.departmentNames)) {
            let promiseArr = [];

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }
            if (isEmptyObject(state.postDepLocsState.postDepLocs)) {
                promiseArr.push(postDepLocsGet(true));
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet(true));
            }
            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet(true));
            }
            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet(true));
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'post_dep_loc_united?status=all') this.props.onPostDepLocsGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'dep_loc') this.props.onDepartmentsLocationsGet(value.data);
                        if (value.config.url === 'departments') this.props.onDepartmentNamesGet(value.data);
                    });

                    this.props.onMakeShortUsers();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onMakeShortUsers();
        }
    }

    render() {
        return (
            <Users {...this.props} />
        );
    }
}

export default UsersClassComponent;