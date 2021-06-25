import './TaskReadView.scss';
import './ProtegeAnswer.scss';
import './MentorGrade.scss';

import { useCallback } from 'react';
import { serverName } from '../../../../../../config/serverName';
import { useShallowEqualSelector } from '../../../../../../hooks/useShallowEqualSelector';
import { useDispatch } from 'react-redux';
import { changePlanTaskAnswerCommentActionCreator, changeTaskAnswerCommentActionCreator, changeTaskGradeActionCreator, loadFileToTaskAnswerThunk, planSaveMentorThunk, planSaveProtegeThunk, sendTaskForCheckingThunk } from '../../../../../../redux/planReducer';
import { useParams } from 'react-router-dom';

function callback(bIndex, state) {
    let locState = {};
    if (bIndex !== undefined) {
        locState.task = state.planState.plan.blocks[bIndex].task;
    }
    else {
        locState.task = state.planState.plan.task;
    }
    locState.userType = state.planState.userType;
    return locState;
}

export default function TaskReadView(props) {
    const memCallback = useCallback(callback.bind(null, props.bIndex), [props.bIndex]);
    const {task, userType} = useShallowEqualSelector(memCallback);

    return (
        <div className="task-read-view">
            <div className="task-read-view__wrapper">
                <div className="task-read-view__title">
                    {task.title}
                </div>
                <div className="task-read-view__desc">
                    {task.desc}
                </div>
                {
                    task.file &&
                    <a href={serverName + task.file} className="task-read-view__file" target="_blank">Скачать файл задания</a>
                }
            </div>
            <ProtegeAnswer task={task} userType={userType} bIndex={props.bIndex} />
            <MentorGrade task={task} userType={userType} bIndex={props.bIndex} />
        </div>
    );
}

function ProtegeAnswer(props) {
    const dispatch = useDispatch();
    const {planId} = useParams();

    return (
        <div className="protege-answer">
            {
                props.task.status !== 'incomplete' && props.task.answer &&
                <div className="protege-answer__content">
                    <div className="protege-answer__content-title">Ответ стажера</div>
                    <div className="protege-answer__content-comment">
                        {props.task.answer.comment}
                    </div>
                    {
                        props.task.answer.file &&
                        <a href={serverName + props.task.answer.file} className="protege-answer__content-file" target="_blank">Скачать файл ответа</a>
                    }
                </div>
            }
            {
                props.userType === 'protege' && props.task.status === 'incomplete' &&
                <div className="protege-answer__send">
                    <div className="protege-answer__send-title">Напишите свой ответ и прикрепите к нему файл при необходимости</div>
                    <div className="protege-answer__send-comment">
                        <textarea name="protege-answer__send-comment"
                            value={props.task.answer === undefined ? '' : props.task.answer.comment}
                            onChange={e => {
                                if (props.bIndex !== undefined) {
                                    dispatch(changeTaskAnswerCommentActionCreator(e.target.value, props.bIndex));
                                }
                                else {
                                    dispatch(changePlanTaskAnswerCommentActionCreator(e.target.value));
                                }
                            }}
                        ></textarea>
                    </div>
                    <div className="protege-answer__send-file">
                        <input type="file" name="protege-answer__send-file"
                            onChange={e => {
                                if (props.bIndex !== undefined) {
                                    dispatch(loadFileToTaskAnswerThunk(e.target, planId, props.bIndex));
                                }
                                else {
                                    dispatch(loadFileToTaskAnswerThunk(e.target, planId));
                                }
                            }}
                        />
                        {
                            props.task.answer?.file &&
                            <a href={serverName + props.task.answer.file} className="protege-answer__send-file-url" target="_blank">{props.task.answer.file}</a>
                        }
                    </div>
                    <div className="protege-answer__send-btns">
                        <button className="protege-answer__send-save"
                            onClick={() => {
                                dispatch(planSaveProtegeThunk(planId));
                            }}
                        >Сохранить</button>
                        <button className="protege-answer__send-btn"
                            onClick={() => {
                                dispatch(sendTaskForCheckingThunk(planId, props.bIndex));
                            }}
                        >Отправить</button>
                    </div>
                </div>
            }
        </div>
    );
}

function MentorGrade(props) {
    const dispatch = useDispatch();
    const {planId} = useParams();

    return (
        <div className="mentor-grade">
            {
                props.task.status === 'complete' &&
                <div className="mentor-grade__show">
                    <div className="mentor-grade__show-title">Оценка наставника</div>
                    <div className="mentor-grade__show-procent">{props.task.grade}</div>
                </div>
            }
            {
                props.userType === 'mentor' && props.task.status === 'checking' &&
                <div className="mentor-grade__set">
                    <input type="text" name="mentor-grade__set" placeholder="Впишите оценку в виде цифры от 0 до 100"
                        value={props.task.grade ?? ''}
                        onChange={e => {
                            dispatch(changeTaskGradeActionCreator(e.target.value, props.bIndex));
                        }}
                    />
                    <div className="mentor-grade__set-btn">
                        <button
                            onClick={() => {
                                dispatch(planSaveMentorThunk(planId));
                            }}
                        >Оценить</button>
                    </div>
                </div>
            }
        </div>
    );
}