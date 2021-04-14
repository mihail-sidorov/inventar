import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import PostsPagePaginationContainer from './Pagination/PostsPagePaginationContainer';
import PostsContainer from './Posts/PostsContainer';
import PostsPageSearchContainer from './Search/PostsPageSearchContainer';

let PostsPage = (props) => {
    return (
        <div className="posts-page">
            <div className="posts-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="posts-page__controls">
                            <NavLink className="posts-page__go-to-postsDepartmentsLocations btn" to="/postsDepartmentsLocations">Перейти к списку должностей-отделов-местонахождений</NavLink>
                        </div>
                        <PostsPageSearchContainer searchSwitch={props.searchSwitch} />
                        <PostsContainer searchOn={props.searchOn} />
                        <PostsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let PostsPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <PostsPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default PostsPageClassComponent;