import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ id }) {
  const [isRecipeOnFavorites, setRecipeOnFavorites] = useState(false);
  const favoriteRecipes = useSelector((state) => state.savedRecipes.favoriteRecipes);

  useEffect(() => {
    if (favoriteRecipes.some((item) => item.id === id)) {
      setRecipeOnFavorites(true);
    } else setRecipeOnFavorites(false);
  }, [favoriteRecipes, id]);

  return (
    <button type="button">
      <img
        src={ isRecipeOnFavorites ? blackHeartIcon : whiteHeartIcon }
        alt=""
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FavoriteBtn;
