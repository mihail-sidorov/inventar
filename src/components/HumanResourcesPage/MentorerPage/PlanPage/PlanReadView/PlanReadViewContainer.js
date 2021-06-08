import { connect } from 'react-redux';
import PlanReadView from './PlanReadView';

let PlanReadViewContainer = connect(
    state => ({
        plan: state.planState.plan,
        userType: state.planState.userType,
        //userType: 'protege',
    }),
    dispatch => ({})
)(PlanReadView);

export default PlanReadViewContainer;