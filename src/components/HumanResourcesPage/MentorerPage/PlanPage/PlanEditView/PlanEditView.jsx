import React from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router';
import TestEditView from './TestEditView/TestEditView';

let PlanEditView = props => {
    let plan = props.plan;
    if (plan !== null) {
        let blocks = [];
        let planBlocks = plan.blocks;
        plan.blocks?.forEach((block, index) => {
            let bIndex = index;
            let sections = [];
            block.sections?.forEach((section, index) => {
                section = (
                    <div className="plan-edit-view__section" index={index} key={index}>
                        <input className="plan-edit-view__section-input" type="text" value={section.title} placeholder="Заголовок раздела" onChange={e => {
                            let value = $(e.target).val();
                            let indexBlock = $(e.target).closest('.plan-edit-view__block').attr('index');
                            let indexSection = $(e.target).closest('.plan-edit-view__section').attr('index');
                            props.sectionTitleEdit(value, indexBlock, indexSection);
                        }} />
                        {
                            block.sections.length > 1 &&
                            <div className="plan-edit-view__section-arrows">
                                {
                                    index > 0 &&
                                    <div className="plan-edit-view__section-arrow plan-edit-view__section-arrow_up"
                                        onClick={() => {
                                            props.movePlanSection(bIndex, index, index - 1);
                                        }}
                                    ></div>
                                }
                                {
                                    index < block.sections.length - 1 &&
                                    <div className="plan-edit-view__section-arrow"
                                        onClick={() => {
                                            props.movePlanSection(bIndex, index, index + 1);
                                        }}
                                    ></div>
                                }
                            </div>
                        }
                        <div className="plan-edit-view__del-section" onClick={e => {
                            let indexBlock = $(e.target).closest('.plan-edit-view__block').attr('index');
                            let indexSection = $(e.target).closest('.plan-edit-view__section').attr('index');
                            props.delPlanSection(indexBlock, indexSection);
                        }}></div>
                    </div>
                );
                sections.push(section);
            });
            sections = (
                <div className="plan-edit-view__sections">
                    <div className="plan-edit-view__sections-title">
                        <div className="plan-edit-view__add-section add-btn" onClick={e => {
                            let indexBlock = $(e.target).closest('.plan-edit-view__block').attr('index');
                            props.addPlanSection(indexBlock);
                        }}></div>
                        <span>Разделы блока</span>
                    </div>
                    {sections}
                </div>
            );
            block = (
                <div className="plan-edit-view__block" index={index} key={index}>
                    <div className="plan-edit-view__block-title">
                        <span>Блок</span>
                        <div className="plan-edit-view__block-arrows">
                            {
                                index > 0 &&
                                <div className="plan-edit-view__block-arrow plan-edit-view__block-arrow_up"
                                    onClick={() => {
                                        props.movePlanBlock(index, index - 1);
                                    }}
                                ></div>
                            }
                            {
                                index < planBlocks.length - 1 &&
                                <div className="plan-edit-view__block-arrow"
                                    onClick={() => {
                                        props.movePlanBlock(index, index + 1);
                                    }}
                                ></div>
                            }
                        </div>
                        <div className="plan-edit-view__del-block" onClick={e => {
                            let index = $(e.target).closest('.plan-edit-view__block').attr('index');
                            props.delPlanBlock(index);
                        }}></div>
                    </div>
                    <input className="plan-edit-view__block-input" type="text" value={block.title} placeholder="Заголовок блока" onChange={e => {
                        let value = $(e.target).val();
                        let index = Number($(e.target).closest('.plan-edit-view__block').attr('index'));
                        props.blockTitleEdit(value, index);
                    }} />
                    {sections}
                    {
                        block.test
                            ?
                            <TestEditView blockIndex={index} />
                            :
                            <div className="plan-edit-view__test">
                                <div
                                    className="plan-edit-view__test-add add-btn"
                                    onClick={() => {
                                        props.addTest(index);
                                    }}
                                ></div>
                                <span>Тест</span>
                            </div>
                    }
                </div>
            );
            blocks.push(block);
        });
        blocks = (
            <div className="plan-edit-view__blocks">
                {blocks}
            </div>
        );
        plan = (
            <div className="plan-edit-view">
                <div className="plan-edit-view__head">
                    <div className="plan-edit-view__add-entity-wrapper">
                        <div className="plan-edit-view__add-entity add-btn" onClick={() => {
                            props.addPlanBlock();
                        }}></div>
                        <span>Блок</span>
                    </div>
                    {
                        !plan.test
                            &&
                            <div className="plan-edit-view__add-entity-wrapper">
                                <div className="plan-edit-view__add-entity add-btn" onClick={() => {
                                    props.addPlanTest();
                                }}></div>
                                <span>Контрольный тест</span>
                            </div>
                    }
                    <div className="plan-edit-view__add-entity-wrapper">
                        <div className="plan-edit-view__add-entity add-btn" onClick={() => {
                            
                        }}></div>
                        <span>Контрольное задание</span>
                    </div>
                </div>
                {
                    plan.test
                        &&
                        <TestEditView />
                }
                {blocks}
                <div className="plan-edit-view__btns">
                    <button className="plan-edit-view__save" onClick={() => {
                        props.planSave(props.match.params.planId, props.plan, props.connectionStatus);
                    }}>{props.connectionStatus === 'noplan' ? 'Создать план' : 'Сохранить'}</button>
                    <button className="plan-edit-view__close" onClick={() => {
                        props.history.push('/mentorer');
                    }}>Закрыть</button>
                </div>
            </div>
        );
    }
    else {
        plan = (
            <div className="plan-edit-view">
                <div className="plan-edit-view__add-block add-btn" onClick={() => {
                    props.addPlanBlock();
                }}></div>
            </div>
        );
    }
    
    return plan;
};

export default withRouter(PlanEditView);