import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './scss/app.scss';

import App from './components/App';
import store from './redux/store';
import { loginGet, setAuthDataActionCreator } from './redux/authReducer';

loginGet()
  .then((response) => {
    store.dispatch(setAuthDataActionCreator(response.data));

    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      ,document.getElementById('app')
    );
  })
  .catch((error) => {
    console.log(error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
