import { connect } from 'react-redux';
import { mentorIdSetActionCreator, mentoringPost, mentorSearchSetActionCreator, protegeIdSetActionCreator, protegeSearchSetActionCreator, resetMentorerPageStateActionCreator, setHrListIsLastPageActionCreator } from '../../../../redux/mentorerPageReducer';
import Connections from './Connections';

let ConnectionsContainer = connect(
    state => ({
        mentorSearch: state.mentorerPageState.mentorSearch,
        protegeSearch: state.mentorerPageState.protegeSearch,
        mentorId: state.mentorerPageState.mentorId,
        protegeId: state.mentorerPageState.protegeId,
        users: state.usersState.users,
        hrList: state.mentorerPageState.hrList,
    }),
    dispatch => ({
        mentorSearchSet: search => {
            dispatch(mentorSearchSetActionCreator(search));
        },
        protegeSearchSet: search => {
            dispatch(protegeSearchSetActionCreator(search));
        },
        mentorIdSet: id => {
            dispatch(mentorIdSetActionCreator(id));
        },
        protegeIdSet: id => {
            dispatch(protegeIdSetActionCreator(id));
        },
        mentoringApprove: (mentorId, protegeId, mentorerPageInit) => {
            if (mentorId !== null && protegeId !== null) {
                mentoringPost(mentorId, protegeId)
                    .then(res => {
                        dispatch(resetMentorerPageStateActionCreator());
                        dispatch(setHrListIsLastPageActionCreator());
                        mentorerPageInit();
                    })
                    .catch(console.log);
            }
            else {
                alert('Наставник и стажер должны быть выбраны!');
            }
        },
    })
)(Connections);

export default ConnectionsContainer;