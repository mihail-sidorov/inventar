import { connect } from 'react-redux';
import { mentoringSetActionCreator, resetMentorerPageStateActionCreator, showComponentsChangeActionCreator, showComponentsSetActionCreator } from '../../../redux/mentorerPageReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import MentorerPage from './MentorerPage';

let MentorerPageContainer = connect(
    state => ({
        showComponents: state.mentorerPageState.showComponents,
        mentoring: state.mentorerPageState.mentoring,
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
    })
)(MentorerPage);

export default MentorerPageContainer;