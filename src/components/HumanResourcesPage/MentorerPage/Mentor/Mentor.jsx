import React from 'react';
import { withRouter } from 'react-router';
import PaginationContainer from './Pagination/PaginationContainer';
import SearchContainer from './Search/SearchContainer';
import $ from 'jquery';

let Mentor = props => {
    let mentorListArr = [];
    let mentorListArrIndex = 1;
    for (let shortEntity of props.mentorList.shortEntitys) {
        mentorListArr.push(
            <tr key={mentorListArrIndex} id={shortEntity.id}>
                <td>
                    {props.users[shortEntity.protege_id]?.full_name}
                </td>
                <td>
                    <button
                        onClick={() => {
                            props.history.push(`/mentorer/plan/${shortEntity.id}`);
                        }}
                    >
                        Открыть
                    </button>
                    {
                        shortEntity.status === 'plancreated' &&
                        <button
                            onClick={e => {
                                props.planSend($(e.target).closest('tr').attr('id'));
                            }}
                        >
                            Отправить
                        </button>
                    }
                </td>
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
                            <th></th>
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