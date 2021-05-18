import { connect } from 'react-redux';
import { makeShortHrListActionCreator, makeShortMentorListActionCreator, mentoringSetActionCreator, resetMentorerPageStateActionCreator, showComponentsChangeActionCreator, showComponentsSetActionCreator } from '../../../redux/mentorerPageReducer';
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
        mentoringSet: (mentoringHr, mentoringMentor, mentoringProtege) => {
            dispatch(mentoringSetActionCreator(mentoringHr, mentoringMentor, mentoringProtege));
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
    })
)(MentorerPage);

export default MentorerPageContainer;