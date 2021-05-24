import { connect } from 'react-redux';
import { makeShortHrListActionCreator, makeShortLeaderListActionCreator, makeShortMentorListActionCreator, makeShortProtegeListActionCreator, mentoringSetActionCreator, resetMentorerPageStateActionCreator, showComponentsChangeActionCreator, showComponentsSetActionCreator } from '../../../redux/mentorerPageReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import MentorerPage from './MentorerPage';

let MentorerPageContainer = connect(
    state => ({
        showComponents: state.mentorerPageState.showComponents,
    }),
    dispatch => ({
        showComponentsChange: component => {
            dispatch(showComponentsChangeActionCreator(component));
        },
        mentoringSet: (mentoringHr, mentoringMentor, mentoringProtege, mentoringLeader) => {
            dispatch(mentoringSetActionCreator(mentoringHr, mentoringMentor, mentoringProtege, mentoringLeader));
        },
        usersSet: data => {
            dispatch(usersGetActionCreator(data));
        },
        showComponentsSet: obj => {
            dispatch(showComponentsSetActionCreator(obj));
        },
        resetMentorerPageState: () => {
            dispatch(resetMentorerPageStateActionCreator());
        },
        makeShortHrList: () => {
            dispatch(makeShortHrListActionCreator());
        },
        makeShortMentorList: () => {
            dispatch(makeShortMentorListActionCreator());
        },
        makeShortProtegeList: () => {
            dispatch(makeShortProtegeListActionCreator());
        },
        makeShortLeaderList: () => {
            dispatch(makeShortLeaderListActionCreator());
        },
    })
)(MentorerPage);

export default MentorerPageContainer;