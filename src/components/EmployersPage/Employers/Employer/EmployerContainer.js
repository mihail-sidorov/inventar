import { connect } from 'react-redux';
import Employer from './Employer';

let EmployerContainer = (id) => {
    return connect(
        state => ({
            employer: state.employersState.employers[id],
        }),
        dispatch => ({
            onGoToEmployerEdit: (props) => {
                props.history.push(`/employers/${props.employer.id}`);
            },
        })
    )(Employer);
}

export default EmployerContainer;