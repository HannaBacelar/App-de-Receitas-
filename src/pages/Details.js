import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/Details.css';

function Details({ type }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const RECIPE_URL = (type === 'Meal')
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(RECIPE_URL);
      const result = await response.json();
      const fetchedRecipe = (type === 'Meal')
        ? result.meals[0]
        : result.drinks[0];
      setRecipe(fetchedRecipe);
      console.log(fetchedRecipe);
    };
    const fetchRecommendations = async () => {
      const RECOMMENDATION_URL = (type === 'Meal')
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(RECOMMENDATION_URL);
      const result = await response.json();
      const fetchedRecommendations = (type === 'Meal')
        ? result.drinks
        : result.meals;
      setRecommendations(fetchedRecommendations);
      console.log(fetchedRecommendations);
    };
    fetchRecipe();
    fetchRecommendations();
  }, [id, type]);

  const renderIngredients = () => {
    const ingredients = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          <li
            key={ `ingredient-${i}` }
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
          >
            {recipe[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {recipe[`strMeasure${i}`]}
          </li>,
        );
      }
    }
    return ingredients;
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      <img
        className="details-image"
        data-testid="recipe-photo"
        alt=""
        src={ recipe[`str${type}Thumb`] }
      />
      <h2 data-testid="recipe-title">{recipe[`str${type}`]}</h2>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <span data-testid="recipe-category">
        {recipe?.strAlcoholic || recipe.strCategory}
      </span>
      <h3>Ingredients</h3>
      <ul>{renderIngredients()}</ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {recipe?.strYoutube && <iframe
        data-testid="video"
        title={ recipe[`str${type}`] }
        src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
      />}
      <Slider { ...sliderSettings } className="slider">
        {recommendations.map((item, index) => {
          const max = 5;
          if (index > max) return;
          return (
            <div
              key={ index }
              className="recommendation-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <div className="recommendation-img-container">
                <img alt="" src={ item?.strMealThumb || item.strDrinkThumb } />
              </div>
              <h3 data-testid={ `${index}-recomendation-title` }>
                {item?.strMeal || item.strDrink}
              </h3>
              <span>
                {item?.strAlcoholic || item.strCategory}
              </span>
            </div>
          );
        })}
      </Slider>
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Start Recipe

      </button>
    </div>
  );
}

Details.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Details;
