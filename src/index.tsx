import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import './index.css';

import { App } from './App';
import { createStore } from './store/store';

const store = createStore();

(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
