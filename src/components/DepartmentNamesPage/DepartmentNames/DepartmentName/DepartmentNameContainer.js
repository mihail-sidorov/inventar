import { connect } from 'react-redux';
import DepartmentName from './DepartmentName';

let DepartmentNameContainer = (id) => {
    return connect(
        state => ({
            departmentName: state.departmentNamesState.departmentNames[id],
        }),
        dispatch => ({
            onGoToDepartmentNameEdit: (props) => {
                props.history.push(`/departmentNames/${props.departmentName.id}`);
            },
        })
    )(DepartmentName);
}

export default DepartmentNameContainer;