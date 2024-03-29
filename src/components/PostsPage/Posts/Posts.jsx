import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { postsGet } from '../../../redux/postsReducer';
import PostContainer from './Post/PostContainer';

let Posts = (props) => {
    let postsArr = [];

    for (let id in props.posts) {
        let Post = PostContainer(id);
        postsArr.push(<Post key={id} />);
    }

    return (
        <div className="posts">
            <table border="1">
                <thead>
                    <tr>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postsArr.length ? postsArr :
                        <tr>
                            <td colSpan="4">
                                {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

let PostsClassComponent = class extends React.Component {
    render() {
        return <Posts {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsState.posts)) {
            postsGet()
                .then((res) => {
                    this.props.postsSet(res.data);
                    this.props.shortPostsSet();
                });
        }
        else {
            this.props.shortPostsSet();
        }
    }
}

export default PostsClassComponent;