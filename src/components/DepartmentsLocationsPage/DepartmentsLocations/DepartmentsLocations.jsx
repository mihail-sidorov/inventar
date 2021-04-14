import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentNamesGet } from '../../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../../redux/locationsReducer';
import DepartmentLocationContainer from './DepartmentLocation/DepartmentLocationContainer';

let DepartmentsLocations = (props) => {
    let departmentsLocationsArr = [];

    for (let id in props.departmentsLocations) {
        let DepartmentLocation = DepartmentLocationContainer(id);
        departmentsLocationsArr.push(<DepartmentLocation key={id} />);
    }

    return (
        <div className="departmentsLocations">
            <table border="1">
                <thead>
                    <tr>
                        <th>Отдел</th>
                        <th>Местонахождение</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departmentsLocationsArr.length ? departmentsLocationsArr :
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

let DepartmentsLocationsClassComponent = class extends React.Component {
    render() {
        return <DepartmentsLocations {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentsLocationsState.departmentsLocations) || isEmptyObject(state.departmentNamesState.departmentNames)
        || isEmptyObject(state.locationsState.locations)) {
            let promiseArr = [];

            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet());
            }
            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'dep_loc') this.props.departmentsLocationsSet(value.data);
                        if (value.config.url === 'departments') this.props.departmentsSet(value.data);
                        if (value.config.url === 'locations') this.props.locationsSet(value.data);
                    });

                    this.props.makeShortDepartmentsLocations();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.makeShortDepartmentsLocations();
        }
    }
}

export default DepartmentsLocationsClassComponent;