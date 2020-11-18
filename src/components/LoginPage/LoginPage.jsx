import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

let LoginForm = (props) => {
    return (
        <div className="login-page">
            <form className="login-page__form" onSubmit={props.handleSubmit}>
                <div className="login-page__form-container">
                    <div className="login-page__form-fields">
                        <div className="login-page__form-field">
                            <label><Field name={'login'} type={'text'} component={'input'} placeholder="Логин" /></label>
                        </div>
                        <div className="login-page__form-field">
                            <label><Field name={'password'} type={'password'} component={'input'} placeholder="Пароль" /></label>
                        </div>
                    </div>
                    <div className="login-page__form-btns">
                        <button className="btn">Войти</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

LoginForm = reduxForm({
    form: 'loginForm',
})(LoginForm);

let LoginPage = (props) => {
    if (props.isAuth) return <Redirect to="/main" />;

    return (
        <LoginForm onSubmit={props.onLogin} />
    );
}

export default LoginPage;