import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialEntries = ['/'],
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = {},
) => {
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
