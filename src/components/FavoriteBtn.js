import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { removeFavoriteRecipe, setFavoriteRecipe } from '../redux/actions';

function FavoriteBtn({ recipe, type, changeId, index }) {
  const [isRecipeOnFavorites, setRecipeOnFavorites] = useState(false);
  const favoriteRecipes = useSelector((state) => state.savedRecipes.favoriteRecipes);
  const dispatch = useDispatch();
  const id = changeId ? recipe.id : recipe[`id${type}`];

  useEffect(() => {
    if (favoriteRecipes.some((item) => item.id === id)) {
      setRecipeOnFavorites(true);
    } else setRecipeOnFavorites(false);
  }, [favoriteRecipes, id]);

  const handleFavorite = () => {
    if (isRecipeOnFavorites) {
      const filteredFavorites = favoriteRecipes.filter((item) => item.id !== id);
      dispatch(removeFavoriteRecipe(filteredFavorites));
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    } else {
      const currentRecipe = {
        id,
        type: type === 'Drink' ? 'drink' : 'food',
        nationality: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe?.strAlcoholic || '',
        name: recipe[`str${type}`],
        image: recipe[`str${type}Thumb`],
      };
      dispatch(setFavoriteRecipe(currentRecipe));
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify([...favoriteRecipes, currentRecipe]),
      );
    }
  };

  return (
    <button type="button" className="transparent" onClick={ handleFavorite }>
      <img
        src={ isRecipeOnFavorites ? blackHeartIcon : whiteHeartIcon }
        className={ isRecipeOnFavorites ? 'favorite-checked' : 'favorite-unchecked' }
        alt=""
        width="26"
        height="26"
        data-testid={
          changeId
            ? `${index}-horizontal-favorite-btn`
            : 'favorite-btn'
        }
      />
    </button>
  );
}

FavoriteBtn.defaultProps = {
  changeId: false,
  index: 0,
};

FavoriteBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes).isRequired,
  type: PropTypes.string.isRequired,
  changeId: PropTypes.bool,
  index: PropTypes.number,
};

export default FavoriteBtn;
