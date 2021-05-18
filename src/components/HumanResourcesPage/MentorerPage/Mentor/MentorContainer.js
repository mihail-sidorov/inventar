import { connect } from 'react-redux';
import Mentor from './Mentor';

let MentorContainer = connect(
    state => ({
        users: state.usersState.users,
        mentorList: state.mentorerPageState.mentorList,
    }),
    dispatch => ({})
)(Mentor);

export default MentorContainer;