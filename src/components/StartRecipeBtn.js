import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import '../styles/StartRecipeBtn.css';

function StartRecipeBtn() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const doneRecipes = useSelector((state) => state.savedRecipes.doneRecipes);
  const inProgressRecipes = useSelector((state) => state.savedRecipes.inProgressRecipes);

  const inProgressIds = Object
    .keys({ ...inProgressRecipes?.meals, ...inProgressRecipes?.cocktails } || {});

  const handleStartRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div>
      {!doneRecipes.some((item) => item.id === id) && (
        <div className="start-recipe-container">
          <button
            type="button"
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
          >
            {
              inProgressIds.some((item) => item === id)
                ? 'Continue Recipe'
                : 'Start Recipe'
            }
          </button>
        </div>
      )}
    </div>
  );
}

export default StartRecipeBtn;
