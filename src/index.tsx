import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import './index.css';

import { App } from './App';
import { store } from './domain/store';

(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
