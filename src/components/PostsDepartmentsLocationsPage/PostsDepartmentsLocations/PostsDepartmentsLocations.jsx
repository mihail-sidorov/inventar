import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { departmentNamesGet } from '../../../redux/departmentNamesReducer';
import { departmentsLocationsGet } from '../../../redux/departmentsLocationsReducer';
import { locationsGet } from '../../../redux/locationsReducer';
import { postsDepartmentsLocationsGet } from '../../../redux/postsDepartmentsLocationsReducer';
import { postsGet } from '../../../redux/postsReducer';
import PostDepartmentLocationContainer from './PostDepartmentLocation/PostDepartmentLocationContainer';

let PostsDepartmentsLocations = (props) => {
    let postsDepartmentsLocationsArr = [];

    for (let id in props.postsDepartmentsLocations) {
        let PostDepartmentLocation = PostDepartmentLocationContainer(id);
        postsDepartmentsLocationsArr.push(<PostDepartmentLocation key={id} />);
    }

    return (
        <div className="postsDepartmentsLocations">
            <table border="1">
                <thead>
                    <tr>
                        <th>Должность</th>
                        <th>Отдел</th>
                        <th>Местонахождение</th>
                    </tr>
                </thead>
                <tbody>
                    {postsDepartmentsLocationsArr}
                </tbody>
            </table>
        </div>
    );
}

let PostsDepartmentsLocationsClassComponent = class extends React.Component {
    render() {
        return <PostsDepartmentsLocations {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations) || isEmptyObject(state.postsState.posts)
        || isEmptyObject(state.departmentsLocationsState.departmentsLocations) || isEmptyObject(state.departmentNamesState.departmentNames)
        || isEmptyObject(state.locationsState.locations)) {
            let promiseArr = [];

            if (isEmptyObject(state.postsDepartmentsLocationsState.postsDepartmentsLocations)) {
                promiseArr.push(postsDepartmentsLocationsGet());
            }
            if (isEmptyObject(state.postsState.posts)) {
                promiseArr.push(postsGet());
            }
            if (isEmptyObject(state.departmentsLocationsState.departmentsLocations)) {
                promiseArr.push(departmentsLocationsGet());
            }
            if (isEmptyObject(state.departmentNamesState.departmentNames)) {
                promiseArr.push(departmentNamesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'post_dep_loc') this.props.postsDepartmentsLocationsSet(value.data);
                        if (value.config.url === 'posts') this.props.postsSet(value.data);
                        if (value.config.url === 'dep_loc') this.props.departmentsLocationsSet(value.data);
                        if (value.config.url === 'departments') this.props.departmentsSet(value.data);
                        if (value.config.url === 'locations') this.props.locationsSet(value.data);
                    });

                    this.props.makeShortPostsDepartmentsLocations();
                })
                .catch(err => console.log(err));
        }
        else {
            this.props.makeShortPostsDepartmentsLocations();
        }
    }
}

export default PostsDepartmentsLocationsClassComponent;