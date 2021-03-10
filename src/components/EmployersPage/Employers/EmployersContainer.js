import { connect } from 'react-redux';
import { makeShortEmployersActionCreator } from '../../../redux/employersPageReducer';
import { employersGetActionCreator } from '../../../redux/employersReducer';
import Employers from './Employers';

let EmployersContainer = connect(
    state => ({
        employers: state.employersPageState.shortEmployers,
    }),
    dispatch => ({
        employersSet: (employersArr) => {
            dispatch(employersGetActionCreator(employersArr));
        },
        shortEmployersSet: () => {
            dispatch(makeShortEmployersActionCreator());
        },
    })
)(Employers);

export default EmployersContainer;