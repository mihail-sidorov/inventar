import React from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router';

let PlanEditView = props => {
    let plan = props.plan;
    if (plan !== null) {
        let blocks = [];
        plan.blocks?.forEach((block, index) => {
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
                    <div className="plan-edit-view__sections-title"><span>Разделы блока</span>
                        <div className="plan-edit-view__add-section add-btn" onClick={e => {
                            let indexBlock = $(e.target).closest('.plan-edit-view__block').attr('index');
                            props.addPlanSection(indexBlock);
                        }}></div>
                    </div>
                    {sections}
                </div>
            );
            block = (
                <div className="plan-edit-view__block" index={index} key={index}>
                    <div className="plan-edit-view__block-title"><span>Блок</span><div className="plan-edit-view__del-block" onClick={e => {
                        let index = $(e.target).closest('.plan-edit-view__block').attr('index');
                        props.delPlanBlock(index);
                    }}></div></div>
                    <input className="plan-edit-view__block-input" type="text" value={block.title} placeholder="Заголовок блока" onChange={e => {
                        let value = $(e.target).val();
                        let index = Number($(e.target).closest('.plan-edit-view__block').attr('index'));
                        props.blockTitleEdit(value, index);
                    }} />
                    {sections}
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
                <div className="plan-edit-view__add-block add-btn" onClick={() => {
                    props.addPlanBlock();
                }}></div>
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