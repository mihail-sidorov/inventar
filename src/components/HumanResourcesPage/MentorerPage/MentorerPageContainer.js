import { connect } from 'react-redux';
import { showComponentsChangeActionCreator } from '../../../redux/mentorerPageReducer';
import MentorerPage from './MentorerPage';

let MentorerPageContainer = connect(
    state => ({
        showComponents: state.mentorerPageState.showComponents,
    }),
    dispatch => ({
        showComponentsChange: component => {
            dispatch(showComponentsChangeActionCreator(component));
        },
    })
)(MentorerPage);

export default MentorerPageContainer;