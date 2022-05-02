import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteBtn from '../components/FavoriteBtn';
import ProgressCheckbox from '../components/ProgressCheckbox';
import ShareBtn from '../components/ShareBtn';
import ShareToast from '../components/ShareToast';
import { getTodaysDate } from '../helpers';
import { saveProgress, setRecipeDone } from '../redux/actions';
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
    for (let index = 1; index <= max; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(
          <ProgressCheckbox
            index={ index }
            recipe={ recipe }
            checkedIngredients={ checkedIngredients }
            changeHandler={ handleCheckboxChange }
            key={ `ingredient-${index}` }
          />,
        );
      }
    }
    ingredientsLength = ingredients.length;
    return ingredients;
  };

  const handleFinishRecipe = () => {
    console.log(recipe);
    // console.log(today);
    const doneObj = { id,
      type: type === 'Drink' ? 'drink' : 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe[`str${type}`],
      image: recipe[`str${type}Thumb`],
      doneDate: getTodaysDate(),
      tags: recipe.strTags,
    };
    dispatch(setRecipeDone(doneObj));
    history.push('/done-recipes');
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
            <ShareBtn toastVisibilityHandler={ setToastVisibility } />
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
          onClick={ handleFinishRecipe }
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
