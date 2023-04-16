import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, unstable_HistoryRouter as HistoryBrowser } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { history } from './util/settings/config';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
      <HistoryBrowser history={history} >
        <Provider store={store}>
          <App />
        </Provider>
      </HistoryBrowser>
    </StyleProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
