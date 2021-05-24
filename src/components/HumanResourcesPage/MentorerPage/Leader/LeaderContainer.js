import { connect } from 'react-redux';
import Leader from './Leader';

let LeaderContainer = connect(
    state => ({
        users: state.usersState.users,
        leaderList: state.mentorerPageState.leaderList,
    }),
    dispatch => ({})
)(Leader);

export default LeaderContainer;