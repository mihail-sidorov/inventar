import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import PostsDepartmentsLocationsPagePaginationContainer from './Pagination/PostsDepartmentsLocationsPagePaginationContainer';
import PostsDepartmentsLocationsContainer from './PostsDepartmentsLocations/PostsDepartmentsLocationsContainer';
import PostsDepartmentsLocationsPageSearchContainer from './Search/PostsDepartmentsLocationsPageSearchContainer';

let PostsDepartmentsLocationsPage = (props) => {
    return (
        <div className="postsDepartmentsLocations-page">
            <div className="postsDepartmentsLocations-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="postsDepartmentsLocations-page__controls">
                            <NavLink className="postsDepartmentsLocations-page__back-to-posts btn" to="/posts">Вернуться к списку должностей</NavLink>
                            <NavLink className="postsDepartmentsLocations-page__add btn" to="/postsDepartmentsLocations/add">+</NavLink>
                        </div>
                        <PostsDepartmentsLocationsPageSearchContainer searchSwitch={props.searchSwitch} />
                        <PostsDepartmentsLocationsContainer searchOn={props.searchOn} />
                        <PostsDepartmentsLocationsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let PostsDepartmentsLocationsPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <PostsDepartmentsLocationsPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default PostsDepartmentsLocationsPageClassComponent;