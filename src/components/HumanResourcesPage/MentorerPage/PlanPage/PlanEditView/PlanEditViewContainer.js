import { connect } from 'react-redux';
import { addPlanBlockActionCreator, addPlanSectionActionCreator, blockTitleEditActionCreator, delPlanBlockActionCreator, delPlanSectionActionCreator, sectionTitleEditActionCreator } from '../../../../../redux/planReducer';
import PlanEditView from './PlanEditView';

let PlanEditViewContainer = connect(
    state => ({
        plan: state.planState.plan,
    }),
    dispatch => ({
        blockTitleEdit: (value, index) => {
            dispatch(blockTitleEditActionCreator(value, index));
        },
        sectionTitleEdit: (value, indexBlock, indexSection) => {
            dispatch(sectionTitleEditActionCreator(value, indexBlock, indexSection));
        },
        addPlanBlock: () => {
            dispatch(addPlanBlockActionCreator());
            alert('Добавлен новый блок!');
        },
        addPlanSection: indexBlock => {
            dispatch(addPlanSectionActionCreator(indexBlock));
            alert('Добавлен новый раздел!');
        },
        delPlanBlock: index => {
            dispatch(delPlanBlockActionCreator(index));
        },
        delPlanSection: (indexBlock, indexSection) => {
            dispatch(delPlanSectionActionCreator(indexBlock, indexSection));
        },
    })
)(PlanEditView);

export default PlanEditViewContainer;