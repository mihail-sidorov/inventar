import { connect } from 'react-redux';
import Protege from './Protege';

let ProtegeContainer = connect(
    state => ({}),
    dispatch => ({})
)(Protege);

export default ProtegeContainer;