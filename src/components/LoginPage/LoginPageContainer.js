import { connect } from 'react-redux';
import LoginPage from './LoginPage';

let LoginPageContainer = connect(
    state => ({
        isAuth: state.authState.isAuth,
    }),
    dispatch => ({
        onLogin: (values) => {
            console.log(values);
        },
    })
)(LoginPage);

export default LoginPageContainer;