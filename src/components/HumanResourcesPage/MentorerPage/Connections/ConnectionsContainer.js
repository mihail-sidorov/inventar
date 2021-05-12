import { connect } from 'react-redux';
import Connections from './Connections';

let ConnectionsContainer = connect(
    state => ({}),
    dispatch => ({})
)(Connections);

export default ConnectionsContainer;