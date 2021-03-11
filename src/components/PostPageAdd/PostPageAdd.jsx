import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { postsGet } from '../../redux/postsReducer';
import InnerPage from '../InnerPage/InnerPage';

let Form = (props) => {
    return (
        <form className="post-page-add__form form" onSubmit={props.handleSubmit(values => {props.onSubmit(values, props)})}>
            <div className="post-page-add__form-fields form__fields">
                <div className="post-page-add__form-field form__field">
                    <label><span><span>Должность</span></span><Field name="post" component="input" type="text" /></label>
                </div>
            </div>
            <div className="post-page-add__form-btns">
                <button className="post-page-add__form-submit-btn btn">Сохранить</button>
            </div>
        </form>
    );
}

Form = reduxForm({
    form: 'postAddForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Form);

let PostPageAdd = (props) => {
    return(
        <div className="post-page-add">
            <div className="post-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="post-page-add__back-to-posts btn" to="/posts">Вернуться к списку должностей</NavLink>
                        <div className="post-page-add__form-container">
                            <div className="post-page-add__title">Добавление должности</div>
                            <Form {...props} />
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

let PostPageAddClassComponent = class extends React.Component {
    render() {
        return <PostPageAdd {...this.props} />
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.postsState.posts)) {
            postsGet()
                .then((res) => {
                    this.props.postsSet(res.data);
                })
                .catch(error => console.log(error));
        }
    }
}

export default withRouter(PostPageAddClassComponent);