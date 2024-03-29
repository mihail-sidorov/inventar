import { connect } from 'react-redux';
import { addPlanBlockActionCreator, addPlanSectionActionCreator, addPlanTaskActionCreator, addPlanTestActionCreator, addTaskActionCreator, addTestActionCreator, blockTitleEditActionCreator, connectionStatusChangeActionCreator, delPlanBlockActionCreator, delPlanSectionActionCreator, movePlanBlockActionCreator, movePlanSectionActionCreator, planSave, sectionTitleEditActionCreator, updatePlanActionCreator } from '../../../../../redux/planReducer';
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
        },
        delPlanBlock: index => {
            dispatch(delPlanBlockActionCreator(index));
        },
        delPlanSection: (indexBlock, indexSection) => {
            dispatch(delPlanSectionActionCreator(indexBlock, indexSection));
        },
        planSave: (id, plan, status) => {
            planSave(id, plan)
                .then((res) => {
                    dispatch(updatePlanActionCreator(res.data.plan));
                    if (status === 'noplan') {
                        dispatch(connectionStatusChangeActionCreator(res.data.status));
                    }
                    let mes = (status === 'noplan' ? 'План создан!' : 'План сохранен!');
                    alert(mes);
                })
                .catch(console.log);
        },
        addTest: blockIndex => {
            dispatch(addTestActionCreator(blockIndex));
        },
        addPlanTest: () => {
            dispatch(addPlanTestActionCreator());
        },
        movePlanBlock: (from, to) => {
            dispatch(movePlanBlockActionCreator(from, to));
        },
        movePlanSection: (bIndex, from, to) => {
            dispatch(movePlanSectionActionCreator(bIndex, from, to));
        },
        addTask: bIndex => {
            dispatch(addTaskActionCreator(bIndex));
        },
        addPlanTask: () => {
            dispatch(addPlanTaskActionCreator());
        },
    })
)(PlanEditView);

export default PlanEditViewContainer;