import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import ShareToast from '../components/ShareToast';
import { saveProgress } from '../redux/actions';
import useFetchRecipe from '../services/useFetchRecipe';
import '../styles/InProgress.css';

function InProgress({ type }) {
  const { id } = useParams();
  const history = useHistory();
  const recipe = useFetchRecipe(type, id);
  const [isToastVisible, setToastVisibility] = useState(false);
  const inProgressRecipes = useSelector((state) => state.savedRecipes.inProgressRecipes);
  const ingredientsProgress = (
    inProgressRecipes[type === 'Drink'
      ? 'cocktails'
      : 'meals']
  )?.[id];
  const [checkedIngredients, setCheckedIngredients] = useState(ingredientsProgress || []);
  const dispatch = useDispatch();
  let ingredientsLength;

  const handleShare = () => {
    const toastShownTime = 800;
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
    setToastVisibility(true);
    setTimeout(() => {
      setToastVisibility(false);
    }, toastShownTime);
  };

  const handleCheckboxChange = (index) => {
    if (checkedIngredients.includes(index)) {
      const filteredIngredients = checkedIngredients.filter((i) => i !== index);
      setCheckedIngredients(filteredIngredients);
      dispatch(saveProgress(type, id, filteredIngredients));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
      dispatch(saveProgress(type, id, [...checkedIngredients, index]));
    }
  };

  const renderIngredients = () => {
    const ingredients = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          <label
            htmlFor={ `ingredient-${i}-checkbox` }
            key={ `ingredient-${i}` }
            className={
              `ingredients-checkbox ${checkedIngredients.includes(i) ? 'striked' : ''}`
            }
            data-testid={ `${i - 1}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `ingredient-${i}-checkbox` }
              onChange={ () => handleCheckboxChange(i) }
              checked={ checkedIngredients.includes(i) }
            />
            {recipe[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {recipe[`strMeasure${i}`]}
          </label>,
        );
      }
    }
    ingredientsLength = ingredients.length;
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
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checkedIngredients.length !== ingredientsLength }
          onClick={ () => history.push('/done-recipes') }
        >
          Finish Recipe

        </button>
      </div>
    </div>
  );
}

InProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InProgress;
