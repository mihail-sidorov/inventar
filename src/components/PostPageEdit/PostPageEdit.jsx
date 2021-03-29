import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { postsGet } from '../../redux/postsReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let Form = (props) => {
    return (
        <form className="post-page-edit__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="post-page-edit__form-fields form__fields">
                <div className="post-page-edit__form-field form__field">
                    <label><span><span>Должность</span></span><Field name="post" component="input" type="text" /></label>
                </div>
            </div>
            <div className="post-page-edit__form-btns">
                <button className="post-page-edit__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'postEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let PostPageEdit = (props) => {
    return(
        <div className="post-page-edit">
            <div className="post-page-edit__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <NavLink className="post-page-edit__back-to-posts btn" to="/posts">Вернуться к списку должностей</NavLink>
                        <div className="post-page-edit__form-container">
                            <div className="post-page-edit__title">Редактирование должности</div>
                            <Form {...props} />
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let PostPageEditClassComponent = class extends React.Component {
    render() {
        return <PostPageEdit {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsState.posts)) {
            postsGet()
                .then((res) => {
                    this.props.postsSet(res.data);
                    this.props.onInitialValuesSet(this.props.match.params.postId, this.props.history);
                })
                .catch(error => console.log(error));
        }
        else {
            this.props.onInitialValuesSet(this.props.match.params.postId, this.props.history);
        }
    }
}

let PostPageEditWithRouter = withRouter(PostPageEditClassComponent);

export default PostPageEditWithRouter;