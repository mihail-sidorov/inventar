import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentNamesGet } from '../../../redux/departmentNamesReducer';
import DepartmentNameContainer from './DepartmentName/DepartmentNameContainer';

let DepartmentNames = (props) => {
    let departmentNamesArr = [];

    for (let id in props.departmentNames) {
        let DepartmentName = DepartmentNameContainer(id);
        departmentNamesArr.push(<DepartmentName key={id} />);
    }

    return (
        <div className="department-names">
            <table border="1">
                <thead>
                    <tr>
                        <th>Отдел</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departmentNamesArr.length ? departmentNamesArr :
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

let DepartmentNamesClassComponent = class extends React.Component {
    render() {
        return <DepartmentNames {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.departmentNamesState.departmentNames)) {
            departmentNamesGet()
                .then((res) => {
                    this.props.departmentNamesSet(res.data);
                    this.props.shortDepartmentNamesSet();
                });
        }
        else {
            this.props.shortDepartmentNamesSet();
        }
    }
}

export default DepartmentNamesClassComponent;