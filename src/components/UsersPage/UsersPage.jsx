import React from 'react';
import { Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import UsersPaginationContainer from './Pagination/UsersPaginationContainer';
import UsersSearchContainer from './Search/UsersSearchContainer';
import UsersContainer from './Users/UsersContainer';

let UsersPage = (props) => {
    return (
        <div className="users-page">
            <div className="users-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <UsersSearchContainer searchSwitch={props.searchSwitch} />
                        <UsersContainer searchOn={props.searchOn} />
                        <UsersPaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let UsersPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <UsersPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default UsersPageClassComponent;