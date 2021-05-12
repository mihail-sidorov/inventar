import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../InnerPage/InnerPageContainer';
import ConnectionsContainer from './Connections/ConnectionsContainer';
import MentorContainer from './Mentor/MentorContainer';
import ProtegeContainer from './Protege/ProtegeContainer';

let MentorerPage = props => {
    let tabs = [];
    let tabIndex = 1;
    for (let component in props.showComponents) {
        tabs.push(
            <div
                component={component}
                key={tabIndex}
                className={`mentorer-page__tab${props.showComponents[component] ? ' mentorer-page__tab_active' : ''}`}
                onClick={(e) => {
                    props.showComponentsChange(e.target.getAttribute('component'));
                }}
            >
                {component === 'hr' ? 'Связи' : component === 'mentor' ? 'Наставник' : component === 'protege' ? 'Ученик' : ''}
            </div>
        );
        tabIndex++;
    }

    return (
        <div className="mentorer-page">
            <div className="mentorer-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <NavLink className="mentorer-page__back-to-human-resources btn" to="/humanResources">Вернуться в отдел кадров</NavLink>
                        <div className="mentorer-page__title">Наставничество</div>
                        <div className="mentorer-page__tabs">
                            {tabs}
                        </div>
                        {
                            props.showComponents.hr && <ConnectionsContainer />
                        }
                        {
                            props.showComponents.mentor && <MentorContainer />
                        }
                        {
                            props.showComponents.protege && <ProtegeContainer />
                        }
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
};

export default MentorerPage;