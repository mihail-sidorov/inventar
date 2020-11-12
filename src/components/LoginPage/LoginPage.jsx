import React from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = (props) => {
    return (
        <form className="login-form" onSubmit={props.handleSubmit}>
            <div className="login-form__container">
                <div className="login-form__fields">
                    <div className="login-form__login">
                        <label><Field name={'login'} type={'text'} component={'input'} placeholder="Логин" /></label>
                    </div>
                    <div className="login-form__password">
                        <label><Field name={'password'} type={'password'} component={'input'} placeholder="Пароль" /></label>
                    </div>
                </div>
                <div className="login-form__btns">
                    <button>Войти</button>
                </div>
            </div>
        </form>
    );
}

LoginForm = reduxForm({
    form: 'loginForm',
})(LoginForm);

let LoginPage = (props) => {
    return (
        <LoginForm onSubmit={props.onLogin} />
    );
}

export default LoginPage;