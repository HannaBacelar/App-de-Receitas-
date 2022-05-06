import React from 'react';
import { Route } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const renderFavorites = (initialState) => renderWithRouterAndStore(
  <Route path="/favorite-recipes">
    <FavoriteRecipes />
  </Route>, {
    initialEntries: ['/favorite-recipes'],
    initialState },
);

export default renderFavorites;
