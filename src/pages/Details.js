import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import FavoriteBtn from '../components/FavoriteBtn';
import RecommendationsSection from '../components/RecommendationSection';
import ShareBtn from '../components/ShareBtn';
import ShareToast from '../components/ShareToast';
import StartRecipeBtn from '../components/StartRecipeBtn';
import '../styles/Details.css';

function Details({ type }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isToastVisible, setToastVisibility] = useState(false);

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
    };
    fetchRecipe();
    fetchRecommendations();
  }, [id, type]);

  const handleShare = () => {
    const toastShownTime = 800;
    navigator.clipboard.writeText(window.location.href);
    setToastVisibility(true);
    setTimeout(() => {
      setToastVisibility(false);
    }, toastShownTime);
  };

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

  return (
    <div>
      <img
        className="details-image"
        data-testid="recipe-photo"
        alt=""
        src={ recipe[`str${type}Thumb`] }
      />
      <div className="details-container">
        <div className="details-header">
          <div>
            <h2 data-testid="recipe-title">{recipe[`str${type}`]}</h2>
            <span data-testid="recipe-category">
              {recipe?.strAlcoholic || recipe.strCategory}
            </span>
          </div>
          <div className="details-btns">
            <ShareBtn shareHandler={ handleShare } />
            <FavoriteBtn recipe={ recipe } type={ type } />
          </div>
        </div>
        <ShareToast isToastVisible={ isToastVisible } />
        <h3>Ingredients</h3>
        <ul>{renderIngredients()}</ul>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {recipe?.strYoutube && (
          <>
            <h3>Video</h3>
            <iframe
              data-testid="video"
              title={ recipe[`str${type}`] }
              width="100%"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            />
          </>
        )}
        <h3>Recommended</h3>
        <RecommendationsSection recommendations={ recommendations } />
        <StartRecipeBtn />
      </div>
    </div>
  );
}

Details.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Details;
