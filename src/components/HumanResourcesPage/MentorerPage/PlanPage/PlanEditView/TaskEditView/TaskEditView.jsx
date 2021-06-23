import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { serverName } from '../../../../../../config/serverName';
import { useShallowEqualSelector } from '../../../../../../hooks/useShallowEqualSelector';
import { changePlanTaskDescActionCreator, changePlanTaskTitleActionCreator, changeTaskDescActionCreator, changeTaskTitleActionCreator, delPlanTaskActionCreator, delTaskActionCreator, loadFileToTaskByMentorThunk } from '../../../../../../redux/planReducer';
import './TaskEditView.scss';

function callback(bIndex, state) {
    if (bIndex !== undefined) {
        return {
            task: state.planState.plan.blocks[bIndex].task,
        };
    }
    else {
        return {
            task: state.planState.plan.task,
        };
    }
}

export default function TaskEditView(props) {
    const memCallback = useCallback(callback.bind(null, props.bIndex), [props.bIndex]);
    const {task} = useShallowEqualSelector(memCallback);
    const dispatch = useDispatch();
    const {planId} = useParams();

    return (
        <div className="task-edit-view">
            <div className="task-edit-view__task-title">
                <span>Задание</span>
                <div className="task-edit-view__task-del"
                    onClick={() => {
                        if (props.bIndex !== undefined) {
                            dispatch(delTaskActionCreator(props.bIndex));
                        }
                        else {
                            dispatch(delPlanTaskActionCreator());
                        }
                    }}
                ></div>
            </div>
            <div className="task-edit-view__title">
                <input type="text" name="task-edit-view__title" placeholder="Заголовок задания"
                    value={task.title}
                    onChange={(e) => {
                        if (props.bIndex !== undefined) {
                            dispatch(changeTaskTitleActionCreator(e.target.value, props.bIndex));
                        }
                        else {
                            dispatch(changePlanTaskTitleActionCreator(e.target.value));
                        }
                    }}
                />
            </div>
            <div className="task-edit-view__desc">
                <textarea name="task-edit-view__desc" placeholder="Описание задания"
                    value={task.desc}
                    onChange={(e) => {
                        if (props.bIndex !== undefined) {
                            dispatch(changeTaskDescActionCreator(e.target.value, props.bIndex));
                        }
                        else {
                            dispatch(changePlanTaskDescActionCreator(e.target.value));
                        }
                    }}
                ></textarea>
            </div>
            <div className="task-edit-view__file">
                <input type="file" name="task-edit-view__file"
                    onChange={e => {
                        if (props.bIndex !== undefined) {
                            dispatch(loadFileToTaskByMentorThunk(e.target, planId, props.bIndex));
                        }
                        else {
                            dispatch(loadFileToTaskByMentorThunk(e.target, planId));
                        }
                    }}
                />
                <a href={serverName + task.file} className="task-edit-view__file-url" target="_blank">{task.file}</a>
            </div>
        </div>
    );
}