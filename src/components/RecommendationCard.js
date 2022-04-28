import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Details.css';

function RecommendationCard({ recipe, index }) {
  return (
    <div
      key={ index }
      className="recommendation-card"
      data-testid={ `${index}-recomendation-card` }
    >
      <div className="recommendation-img-container">
        <img alt="" src={ recipe?.strMealThumb || recipe.strDrinkThumb } />
      </div>
      <h3 data-testid={ `${index}-recomendation-title` }>
        {recipe?.strMeal || recipe.strDrink}
      </h3>
      <span>
        {recipe?.strAlcoholic || recipe.strCategory}
      </span>
    </div>
  );
}

RecommendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;

export default RecommendationCard;
