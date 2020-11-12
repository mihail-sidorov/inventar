import { connect } from 'react-redux';
import { loginPost, setAuthDataActionCreator } from '../../redux/authReducer';
import LoginPage from './LoginPage';

let LoginPageContainer = connect(
    state => ({
        isAuth: state.authState.isAuth,
    }),
    dispatch => ({
        onLogin: (values) => {
            if (values.login && values.password) {
                loginPost(values.login, values.password)
                    .then((response) => {
                        dispatch(setAuthDataActionCreator(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    })
)(LoginPage);

export default LoginPageContainer;