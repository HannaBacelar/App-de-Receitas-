import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Details from './pages/Details';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import InProgress from './pages/InProgress';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import './styles/App.css';
import './styles/Dark.css';

function App() {
  const darkMode = useSelector((state) => state.preferences.darkMode);
  console.log(darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // const savedDarkState = JSON.parse(localStorage.getItem('darkMode'));
    // setDarkMode(savedDarkState);
    // if (savedDarkState) document.body.classList.add('dark');
  }, [darkMode]);

  return (
    <div className="global-container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id">
          <Details type="Meal" />
        </Route>
        <Route exact path="/drinks/:id">
          <Details type="Drink" />
        </Route>
        <Route exact path="/foods/:id/in-progress">
          <InProgress type="Meal" />
        </Route>
        <Route exact path="/drinks/:id/in-progress">
          <InProgress type="Drink" />
        </Route>
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsByIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksByIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsByNationality }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
