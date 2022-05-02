import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import ShareToast from '../components/ShareToast';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const doneRecipes = useSelector((state) => state.savedRecipes.doneRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState([...doneRecipes]);
  const { protocol, host } = window.location;

  const [isToastVisible, setToastVisibility] = useState(false);

  const handleFilter = ({ target: { name } }) => {
    if (name === 'all') {
      setFilteredRecipes([...doneRecipes]);
      return;
    }
    setFilteredRecipes(doneRecipes
      .filter((recipe) => recipe.type === name));
  };

  return (
    <div>
      <Header
        pageTitle="Done Recipes"
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ (event) => handleFilter(event) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ (event) => handleFilter(event) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ (event) => handleFilter(event) }
      >
        Drinks
      </button>

      <ShareToast isToastVisible={ isToastVisible } />

      {filteredRecipes.length ? filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id } className="done-recipe-card">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              className="done-recipe-image"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((tag, ind) => ((ind < 2)
            ? (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>)
            : ''))}
          <ShareBtn
            toastVisibilityHandler={ setToastVisibility }
            isInACard
            index={ index }
            url={ `${protocol}//${host}/${recipe.type}s/${recipe.id}` }
          />
        </div>
      )) : ''}

    </div>
  );
}

export default DoneRecipes;
