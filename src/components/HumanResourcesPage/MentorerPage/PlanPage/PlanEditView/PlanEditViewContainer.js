import { connect } from 'react-redux';
import PlanEditView from './PlanEditView';

let PlanEditViewContainer = connect(
    state => ({}),
    dispatch => ({})
)(PlanEditView);

export default PlanEditViewContainer;