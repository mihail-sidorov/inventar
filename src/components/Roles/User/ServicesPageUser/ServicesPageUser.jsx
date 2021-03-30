import React from 'react';
import { Route } from 'react-router';
import InnerPageContainer from '../../../InnerPage/InnerPageContainer';

let ServicesPageUser = (props) => {
    return(
        <div className="services-page-user">
            <div className="services-page-user__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        Сервисы сотрудника
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

export default ServicesPageUser;