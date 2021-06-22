import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { serverName } from '../../../../../../config/serverName';
import { useShallowEqualSelector } from '../../../../../../hooks/useShallowEqualSelector';
import { addPlanTestQuestionActionCreator, addTestQuestionActionCreator, delPlanTestActionCreator, delPlanTestQuestionActionCreator, delTestActionCreator, delTestQuestionActionCreator, loadImageToTestThunk, planTestQuestionAnswerSetRightActionCreator, planTestQuestionAnswerTitleChangeActionCreator, planTestQuestionTitleChangeActionCreator, planTestTitleChangeActionCreator, testQuestionAnswerSetRightActionCreator, testQuestionAnswerTitleChangeActionCreator, testQuestionTitleChangeActionCreator, testTitleChangeActionCreator } from '../../../../../../redux/planReducer';

import './TestEditView.scss';

let TestBlockEditView = (props) => {
    const blockIndex = props.blockIndex;
    let {test} = useShallowEqualSelector(state => ({
        test: state.planState.plan.blocks[blockIndex].test,
    }));
    const dispatch = useDispatch();
    const {planId} = useParams();

    let questions = [];
    test.questions?.forEach((el, index) => {
        let answers = [];
        el.answers?.forEach((el, aIndex) => {
            answers.push(
                <React.Fragment key={aIndex}>
                    <div className="test-edit-view__answer">
                        <input type="text" name="answer" placeholder="Ответ на вопрос" value={el.title}
                            onChange={e => {
                                dispatch(testQuestionAnswerTitleChangeActionCreator(e.target.value, blockIndex, index, aIndex));
                            }}
                        />
                        <input type="file"
                            onChange={(e) => {
                                dispatch(loadImageToTestThunk(e.target, planId, blockIndex, index, aIndex));
                            }}
                        />
                        <input type="radio" name={`right_answer_${blockIndex}_${index}`}
                            onChange={() => {
                                dispatch(testQuestionAnswerSetRightActionCreator(blockIndex, index, aIndex));
                            }}
                            checked={el.isRight === undefined ? false : el.isRight}
                        />
                    </div>
                    {
                        el.img &&
                        <div className="test-edit-view__answer-img">
                            <img src={serverName + el.img} />
                        </div>
                    }
                </React.Fragment>
            );
        });
        if (answers.length !== 0) {
            answers = (
                <div className="test-edit-view__answers">
                    <div className="test-edit-view__answers-title">
                        Ответы
                    </div>
                    {answers}
                </div>
            );
        }
        questions.push(
            <div className="test-edit-view__questions-item-wrapper" key={index}>
                <div className="test-edit-view__questions-item">
                    <input name={`questions_item_title_${index}`} type="text" className="test-edit-view__questions-item-title" value={el.title}
                        placeholder="Вопрос теста"
                        onChange={e => {
                            dispatch(testQuestionTitleChangeActionCreator(e.target.value, blockIndex, index));
                        }}
                    />
                    <input type="file" onChange={(e) => {
                        dispatch(loadImageToTestThunk(e.target, planId, blockIndex, index));
                    }} />
                    <div className="test-edit-view__del-test-question"
                        onClick={() => {
                            dispatch(delTestQuestionActionCreator(blockIndex, index));
                        }}
                    ></div>
                </div>
                {
                    el.img &&
                    <div className="test-edit-view__question-img">
                        <img src={`${serverName}${el.img}`} />
                    </div>
                }
                {answers}
            </div>
        );
    });
    if (questions.length !== 0) {
        questions = (
            <div className="test-edit-view__questions-items">
                {questions}
            </div>
        );
    }

    return (
        <div className="test-edit-view">
            <div className="test-edit-view__test-title">
                <span>Тест</span>
                <div className="test-edit-view__del-test"
                    onClick={() => {
                        dispatch(delTestActionCreator(blockIndex));
                    }}
                ></div>
            </div>
            <div className="test-edit-view__test-title-field">
                <input type="text" name="test_title" value={test.title}
                    onChange={e => {
                        dispatch(testTitleChangeActionCreator(e.target.value, blockIndex));
                    }}
                    placeholder="Заголовок теста"
                />
            </div>
            <div className="test-edit-view__questions">
                <div className="test-edit-view__questions-add add-btn"
                    onClick={() => {
                        dispatch(addTestQuestionActionCreator(blockIndex));
                    }}
                ></div>
                <span>Вопросы теста</span>
            </div>
            {questions}
        </div>
    );
}

function PlanTestEditView(props) {
    let {test} = useShallowEqualSelector(state => ({
        test: state.planState.plan.test,
    }));
    const dispatch = useDispatch();
    const {planId} = useParams();

    let questions = [];
    test.questions?.forEach((el, index) => {
        let answers = [];
        el.answers?.forEach((el, aIndex) => {
            answers.push(
                <React.Fragment key={aIndex}>
                    <div className="test-edit-view__answer">
                        <input type="text" name="answer" placeholder="Ответ на вопрос" value={el.title}
                            onChange={e => {
                                dispatch(planTestQuestionAnswerTitleChangeActionCreator(e.target.value, index, aIndex));
                            }}
                        />
                        <input type="file"
                            onChange={(e) => {
                                dispatch(loadImageToTestThunk(e.target, planId, undefined, index, aIndex));
                            }}
                        />
                        <input type="radio" name={`right_answer_${index}`} checked={el.isRight === undefined ? false : el.isRight}
                            onChange={() => {
                                dispatch(planTestQuestionAnswerSetRightActionCreator(index, aIndex));
                            }}
                        />
                    </div>
                    {
                        el.img &&
                        <div className="test-edit-view__answer-img">
                            <img src={serverName + el.img} />
                        </div>
                    }
                </React.Fragment>
            );
        });
        if (answers.length !== 0) {
            answers = (
                <div className="test-edit-view__answers">
                    <div className="test-edit-view__answers-title">
                        Ответы
                    </div>
                    {answers}
                </div>
            );
        }
        questions.push(
            <div className="test-edit-view__questions-item-wrapper" key={index}>
                <div className="test-edit-view__questions-item">
                    <input name={`questions_item_title_${index}`} type="text" className="test-edit-view__questions-item-title" value={el.title}
                        placeholder="Вопрос теста"
                        onChange={e => {
                            dispatch(planTestQuestionTitleChangeActionCreator(e.target.value, index));
                        }}
                    />
                    <input type="file" onChange={(e) => {
                        dispatch(loadImageToTestThunk(e.target, planId, undefined, index));
                    }} />
                    <div className="test-edit-view__del-test-question"
                        onClick={() => {
                            dispatch(delPlanTestQuestionActionCreator(index));
                        }}
                    ></div>
                </div>
                {
                    el.img &&
                    <div className="test-edit-view__question-img">
                        <img src={`${serverName}${el.img}`} />
                    </div>
                }
                {answers}
            </div>
        );
    });
    if (questions.length !== 0) {
        questions = (
            <div className="test-edit-view__questions-items">
                {questions}
            </div>
        );
    }

    return (
        <div className="test-edit-view">
            <div className="test-edit-view__test-title">
                <span>Тест</span>
                <div className="test-edit-view__del-test"
                    onClick={() => {
                        dispatch(delPlanTestActionCreator());
                    }}
                ></div>
            </div>
            <div className="test-edit-view__test-title-field">
                <input type="text" name="test_title" value={test.title}
                    onChange={e => {
                        dispatch(planTestTitleChangeActionCreator(e.target.value));
                    }}
                    placeholder="Заголовок теста"
                />
            </div>
            <div className="test-edit-view__questions">
                <div className="test-edit-view__questions-add add-btn"
                    onClick={() => {
                        dispatch(addPlanTestQuestionActionCreator());
                    }}
                ></div>
                <span>Вопросы теста</span>
            </div>
            {questions}
        </div>
    );
}

let TestEditView = props => {
    if (props.blockIndex !== undefined) {
        return <TestBlockEditView blockIndex={props.blockIndex} />
    }
    else {
        return <PlanTestEditView />
    }
};

export default React.memo(TestEditView);