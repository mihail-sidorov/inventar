import React from 'react';
import { withRouter } from 'react-router';
import PaginationContainer from './Pagination/PaginationContainer';
import SearchContainer from './Search/SearchContainer';

let Mentor = props => {
    let mentorListArr = [];
    let mentorListArrIndex = 1;
    for (let shortEntity of props.mentorList.shortEntitys) {
        mentorListArr.push(
            <tr key={mentorListArrIndex} onClick={() => {
                props.history.push(`/mentorer/plan/${shortEntity.id}`);
            }}>
                <td>{props.users[shortEntity.protege_id]?.full_name}</td>
            </tr>
        );
        mentorListArrIndex++;
    }

    return (
        <div className="mentor">
            <div className="mentor__list-search">
                <SearchContainer searchSwitch={props.searchSwitch} />
            </div>
            <div className="mentor__list">
                <table>
                    <thead>
                        <tr>
                            <th>Стажер</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mentorListArr.length > 0 ? mentorListArr :
                            <tr>
                                <td colSpan="2">
                                    {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="mentor__pagination">
                <PaginationContainer />
            </div>
        </div>
    );
};

let MentorClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOn: false,
        };
    }

    render() {
        return (
            <Mentor
                {...this.props}
                {...this.state}
                searchSwitch={value => {
                    this.searchSwitch(value);
                }}
            />
        );
    }

    searchSwitch(value) {
        this.setState({searchOn: value ? true : false});
    }
}

export default withRouter(MentorClassComponent);