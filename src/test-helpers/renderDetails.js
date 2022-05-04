import React from 'react';
import { Route } from 'react-router-dom';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import Details from '../pages/Details';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const meal = oneMeal.meals[0];
const drink = oneDrink.drinks[0];

const renderDetails = (type, initialState, store) => {
  const typeConvert = type === 'food' ? 'Meal' : 'Drink';
  const selected = type === 'food' ? meal : drink;
  return renderWithRouterAndStore(
    <Route exact path={ `/${type}s/:id` }>
      <Details type={ typeConvert } />
    </Route>, {
      initialEntries: [`/${type}s/${selected[`id${typeConvert}`]}`],
      initialState,
      store },
  );
};

export default renderDetails;
