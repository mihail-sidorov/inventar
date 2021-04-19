import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { softwareCategoriesGet } from '../../../redux/softwareCategoriesReducer';
import { softwaresGet } from '../../../redux/softwaresReducer';
import SoftwareContainer from './Software/SoftwareContainer';

let Softwares = (props) => {
    let softwaresArr = [];

    for (let id in props.softwares) {
        let Software = SoftwareContainer(id);
        softwaresArr.push(<Software key={id} />);
    }

    return (
        <div className="softwares">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        softwaresArr.length ? softwaresArr :
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

let SoftwaresClassComponent = class extends React.Component {
    render() {
        return <Softwares {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.softwaresState.softwares) || isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
            let promiseArr = [];

            if (isEmptyObject(state.softwaresState.softwares)) {
                promiseArr.push(softwaresGet());
            }
            if (isEmptyObject(state.softwareCategoriesState.softwareCategories)) {
                promiseArr.push(softwareCategoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'softwares') this.props.softwaresSet(value.data);
                        if (value.config.url === 'softwareCategory') this.props.softwareCategoriesSet(value.data);
                    });
                    this.props.shortSoftwaresSet();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.shortSoftwaresSet();
        }
    }
}

export default SoftwaresClassComponent;