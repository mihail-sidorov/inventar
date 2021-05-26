import { connect } from 'react-redux';
import { makeShortHrListActionCreator, makeShortLeaderListActionCreator, makeShortMentorListActionCreator, makeShortProtegeListActionCreator, mentoringHrUpdateActionCreator, mentoringLeaderUpdateActionCreator, mentoringMentorUpdateActionCreator, mentoringProtegeUpdateActionCreator } from '../../../../redux/mentorerPageReducer';
import { planSend } from '../../../../redux/planReducer';
import Mentor from './Mentor';

let MentorContainer = connect(
    state => ({
        users: state.usersState.users,
        mentorList: state.mentorerPageState.mentorList,
    }),
    dispatch => ({
        planSend: id => {
            planSend(id)
                .then(res => {
                    dispatch(mentoringHrUpdateActionCreator(res.data));
                    dispatch(mentoringMentorUpdateActionCreator(res.data));
                    dispatch(mentoringProtegeUpdateActionCreator(res.data));
                    dispatch(mentoringLeaderUpdateActionCreator(res.data));
                    dispatch(makeShortHrListActionCreator());
                    dispatch(makeShortMentorListActionCreator());
                    dispatch(makeShortProtegeListActionCreator());
                    dispatch(makeShortLeaderListActionCreator());
                })
                .catch(console.log);
        },
    })
)(Mentor);

export default MentorContainer;