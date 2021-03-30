import { connect } from 'react-redux';
import CommonFields from './CommonFields';

let CommonFieldsContainer = connect(
    state => ({
        category: state.deviceSavePageState.category,
    })
)(CommonFields);

export default CommonFieldsContainer;