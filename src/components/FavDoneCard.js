import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function FavDoneCard({
  filteredRecipes, protocol, host, visibility, tagVisibility }) {
  return (
    filteredRecipes.length > 0 ? filteredRecipes.map((recipe, index) => (
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
        {
          tagVisibility ? recipe.tags.map((tag, ind) => ((ind < 2)
            ? (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>)
            : ''))
            : (
              <FavoriteBtn
                recipe={ recipe }
                type={ recipe.type }
                index={ index }
                changeId
              />)
        }
        <ShareBtn
          toastVisibilityHandler={ visibility }
          isInACard
          index={ index }
          url={ `${protocol}//${host}/${recipe.type}s/${recipe.id}` }
        />
      </div>
    )) : ''
  );
}

FavDoneCard.defaultProps = {
  tagVisibility: false,
};

FavDoneCard.propTypes = {
  filteredRecipes: PropTypes.arrayOf[PropTypes.any],
  protocol: PropTypes.string,
  host: PropTypes.string,
  visibility: PropTypes.bool,
}.isRequired;

export default FavDoneCard;
