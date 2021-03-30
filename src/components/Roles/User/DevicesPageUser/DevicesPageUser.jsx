import React from 'react';
import { Route } from 'react-router';
import InnerPageContainer from '../../../InnerPage/InnerPageContainer';

let DevicesPageUser = (props) => {
    return(
        <div className="devices-page-user">
            <div className="devices-page-user__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        Оборудование сотрудника
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

export default DevicesPageUser;