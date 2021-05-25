import { useState } from "react";
import { withRouter } from "react-router";
import PaginationContainer from "./Pagination/PaginationContainer";
import SearchContainer from "./Search/SearchContainer";

let Leader = props => {
    let [searchOn, searchSwitch] = useState('');

    let leaderListArr = [];
    let leaderListArrIndex = 1;
    for (let shortEntity of props.leaderList.shortEntitys) {
        leaderListArr.push(
            <tr key={leaderListArrIndex} onClick={() => {
                props.history.push(`/mentorer/plan/${shortEntity.id}`);
            }}>
                <td>{props.users[shortEntity.mentor_id]?.full_name}</td>
                <td>{props.users[shortEntity.protege_id]?.full_name}</td>
            </tr>
        );
        leaderListArrIndex++;
    }

    return (
        <div className="leader">
            <div className="leader__list-search">
                <SearchContainer searchSwitch={searchSwitch} />
            </div>
            <div className="leader__list">
                <table>
                    <thead>
                        <tr>
                            <th>Наставник</th>
                            <th>Стажер</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderListArr.length > 0 ? leaderListArr :
                            <tr>
                                <td colSpan="2">
                                    {searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="leader__pagination">
                <PaginationContainer />
            </div>
        </div>
    );
};

export default withRouter(Leader);