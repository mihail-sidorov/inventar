import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { employersGet } from '../../../redux/employersReducer';
import EmployerContainer from './Employer/EmployerContainer';

let Employers = (props) => {
    let employersArr = [];

    for (let id in props.employers) {
        let Employer = EmployerContainer(id);
        employersArr.push(<Employer key={id} />);
    }

    return (
        <div className="employers">
            <table border="1">
                <thead>
                    <tr>
                        <th>Работодатель</th>
                    </tr>
                </thead>
                <tbody>
                    {employersArr}
                </tbody>
            </table>
        </div>
    );
}

let EmployersClassComponent = class extends React.Component {
    render() {
        return <Employers {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers)) {
            employersGet()
                .then((res) => {
                    this.props.employersSet(res.data);
                    this.props.shortEmployersSet();
                });
        }
        else {
            this.props.shortEmployersSet();
        }
    }
}

export default EmployersClassComponent;