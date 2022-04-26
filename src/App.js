import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Login } />
      <Route exact path="/drinks" component={ Login } />
      <Route exact path="/foods/:id-da-receita" component={ Login } />
      <Route exact path="/drinks/:id-da-receita" component={ Login } />
      <Route exact path="/foods/:id-da-receita/in-progress" component={ Login } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
      <Route exact path="/explore" component={ Login } />
      <Route exact path="/explore/foods" component={ Login } />
      <Route exact path="/explore/drinks" component={ Login } />
      <Route exact path="/explore/foods/ingredients" component={ Login } />
      <Route exact path="/explore/drinks/ingredients" component={ Login } />
      <Route exact path="/explore/foods/nationalities" component={ Login } />
      <Route exact path="/profile" component={ Login } />
      <Route exact path="/done-recipes" component={ Login } />
      <Route exact path="/favorite-recipes" component={ Login } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;

// Tela de login: /;
// Tela principal de receitas de comidas: /foods;
// Tela principal de receitas de bebidas: /drinks;
// Tela de detalhes de uma receita de comida: /foods/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /drinks/{id-da-receita};
// Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
// Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
// Tela de explorar: /explore;
// Tela de explorar comidas: /explore/foods;
// Tela de explorar bebidas: /explore/drinks;
// Tela de explorar comidas por ingrediente: /explore/foods/ingredients;
// Tela de explorar bebidas por ingrediente: /explore/drinks/ingredients;
// Tela de explorar comidas por nacionalidade: /explore/foods/nationalities;
// Tela de perfil: /profile;
// Tela de receitas feitas: /done-recipes;
// Tela de receitas favoritas: /favorite-recipes.
