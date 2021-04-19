import React from 'react';
import { Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import SoftwaresPagePaginationContainer from './Pagination/SoftwaresPagePaginationContainer';
import SoftwaresPageSearchContainer from './Search/SoftwaresPageSearchContainer';
import SoftwaresContainer from './Softwares/SoftwaresContainer';

let SoftwaresPage = (props) => {
    return (
        <div className="softwares-page">
            <div className="softwares-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <SoftwaresPageSearchContainer searchSwitch={props.searchSwitch} />
                        <SoftwaresContainer searchOn={props.searchOn} />
                        <SoftwaresPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let SoftwaresPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <SoftwaresPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default SoftwaresPageClassComponent;