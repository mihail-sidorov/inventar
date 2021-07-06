import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { serverName } from '../../../../../../config/serverName';
import { useShallowEqualSelector } from '../../../../../../hooks/useShallowEqualSelector';
import { planTestFinishActionCreator, planTestQuestionAnswerSetPickActionCreator, testFinishActionCreator, testQuestionAnswerSetPickActionCreator } from '../../../../../../redux/planReducer';
import Timer from '../../../../../Timer/Timer';

import './TestExecutionView.scss';

function TestExecutionView(props) {
    function getTest(blockIndex) {
        if (blockIndex !== undefined) {
            return (
                state => ({
                    test: state.planState.plan.blocks[blockIndex].test,
                })
            );
        }
        else {
            return (
                state => ({
                    test: state.planState.plan.test,
                })
            );
        }
    }

    const {test} = useShallowEqualSelector(getTest(props.blockIndex));
    const dispatch = useDispatch();
    const [qn, qnChange] = useState(null);
    const StartBtnText = props.blockIndex !== undefined ? 'Пройти тест': 'Пройти контрольный тест';

    return (
        <div className="test-execution-view">
            {
                qn === null
                    ?
                    <StartBtn sbt={StartBtnText} qn={qn} qnChange={qnChange} />
                    :
                    <Test test={test} dispatch={dispatch} bi={props.blockIndex} qn={qn} qnChange={qnChange} />
            }
        </div>
    );
}

function StartBtn(props) {
    return (
        <button className="test-execution-view__start-btn"
            onClick={() => {
                if (props.qn === null) {
                    props.qnChange(0);
                }
                else {
                    props.qnChange(props.qn + 1);
                }
            }}
        >
            {
                props.sbt
            }
        </button>
    );
}

function Test(props) {
    let answers = [];
    props.test.questions[props.qn].answers.forEach((el, index) => {
        answers.push(
            <li className="test-execution-view__answer-wrapper" key={index}>
                <div className="test-execution-view__answer">
                    <div className="test-execution-view__answer-title">
                        {el.title}
                    </div>
                    <input type="radio" name={props.bi !== undefined ? `answer_pick_${props.bi}_${props.qn}` : `answer_pick_${props.qn}`}
                        onChange={() => {
                            if (props.bi !== undefined) {
                                props.dispatch(testQuestionAnswerSetPickActionCreator(props.bi, props.qn, index));
                            }
                            else {
                                props.dispatch(planTestQuestionAnswerSetPickActionCreator(props.qn, index));
                            }
                        }}
                        checked={el.isPick === undefined ? false : el.isPick}
                    />
                </div>
                {
                    el.img &&
                    <div className="test-execution-view__answer-img">
                        <img src={serverName + el.img} />
                    </div>
                }
            </li>
        );
    });

    return (
        <>
            <div className="test-execution-view__title">
                {props.test.title}
                <Timer time={605000} />
            </div>
            <div className="test-execution-view__question">
                <div className="test-execution-view__question-title">
                    {props.test.questions[props.qn].title}
                </div>
                {
                    props.test.questions[props.qn].img &&
                    <div className="test-execution-view__question-img">
                        <img src={serverName + props.test.questions[props.qn].img} />
                    </div>
                }
                <ul className="test-execution-view__answers">
                    {answers}
                </ul>
                <button className="test-execution-view__next-question"
                    onClick={() => {
                        let isPick = false;
                        for (let answer of props.test.questions[props.qn].answers) {
                            if (answer.isPick) {
                                isPick = true;
                                break;
                            }
                        }
                        if (isPick) {
                            if (props.qn === props.test.questions.length - 1) {
                                if (props.bi !== undefined) {
                                    props.dispatch(testFinishActionCreator(props.bi));
                                }
                                else {
                                    props.dispatch(planTestFinishActionCreator());
                                }
                            }
                            else {
                                props.qnChange(props.qn + 1);
                            }
                        }
                        else {
                            alert('Выберите один из вариантов ответов!');
                        }
                    }}
                >{props.qn === props.test.questions.length - 1 ? 'Завершить' : 'Далее'}</button>
            </div>
        </>
    );
}

export default React.memo(TestExecutionView);