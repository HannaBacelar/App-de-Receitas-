import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

function FavDoneCard({
  filteredRecipes, protocol, host, visibility, tagVisibility }) {
  return (
    filteredRecipes.length > 0 ? filteredRecipes.map((recipe, index) => (
      <div key={ recipe.id } className="done-recipe-card">
        <Link to={ `/${recipe.type}s/${recipe.id}` } className="done-card-img-container">
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="done-recipe-image"
          />
        </Link>
        <div className="done-card-content">
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="done-card-top-text"
          >
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <div className="done-card-title-row">
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <div className="share-and-fav-card">
              <ShareBtn
                toastVisibilityHandler={ visibility }
                isInACard
                index={ index }
                url={ `${protocol}//${host}/${recipe.type}s/${recipe.id}` }
              />
            </div>
          </div>

          <p data-testid={ `${index}-horizontal-done-date` } className="done-card-date">
            {`Done in: ${recipe.doneDate}`}
          </p>
          {
            tagVisibility
              ? (
                <div className="done-card-tags-container">
                  {recipe.tags.map((tag, ind) => ((ind < 2)
                    ? (
                      <span
                        key={ tag }
                        className="done-card-tag"
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </span>)
                    : ''))}
                </div>
              )
              : (
                <div className="share-and-fav-card">
                  <FavoriteBtn
                    recipe={ recipe }
                    type={ recipe.type }
                    index={ index }
                    changeId
                  />
                </div>)
          }
        </div>
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
