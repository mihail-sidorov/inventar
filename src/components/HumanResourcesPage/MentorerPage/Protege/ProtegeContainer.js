import { connect } from 'react-redux';
import Protege from './Protege';

let ProtegeContainer = connect(
    state => ({
        users: state.usersState.users,
        protegeList: state.mentorerPageState.protegeList,
    }),
    dispatch => ({})
)(Protege);

export default ProtegeContainer;