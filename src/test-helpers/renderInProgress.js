import React from 'react';
import { Route } from 'react-router-dom';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import InProgress from '../pages/InProgress';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const meal = oneMeal.meals[0];
const drink = oneDrink.drinks[0];

const renderInProgress = (type, initialState, store) => {
  const typeConvert = type === 'food' ? 'Meal' : 'Drink';
  const selected = type === 'food' ? meal : drink;
  return renderWithRouterAndStore(
    <Route exact path={ `/${type}s/:id/in-progress` }>
      <InProgress type={ typeConvert } />
    </Route>, {
      initialEntries: [`/${type}s/${selected[`id${typeConvert}`]}/in-progress`],
      initialState,
      store },
  );
};

export default renderInProgress;
