import { connect } from 'react-redux';
import SpecificationsFields from './SpecificationsFields';

let SpecificationsFieldsContainer = connect(
    state => ({
        category: state.deviceSavePageState.category,
    }),
    dispatch => ({

    })
)(SpecificationsFields);

export default SpecificationsFieldsContainer;