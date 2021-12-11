import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { AnyAction, createStore } from 'redux';

import './index.css';

import { App } from './App';

const reducer = (state = null, action: AnyAction) => {
  if (action.type === 'setReplay') {
    return action.replay;
  }

  return state;
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
