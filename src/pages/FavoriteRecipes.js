import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FavDoneCard from '../components/FavDoneCard';
import FavAndDoneFilters from '../components/FilterDoneAndFavoritesBtns';
import Header from '../components/Header';
import ShareToast from '../components/ShareToast';

function FavoriteRecipes() {
  const favorites = useSelector((state) => state.savedRecipes.favoriteRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { protocol, host } = window.location;

  const [isToastVisible, setToastVisibility] = useState(false);

  useEffect(() => {
    setFilteredRecipes([...favorites]);
  }, [favorites]);

  const handleFilter = ({ target: { name } }) => {
    if (name === 'all') {
      setFilteredRecipes([...favorites]);
      return;
    }
    setFilteredRecipes(favorites
      .filter((recipe) => recipe.type === name));
  };

  return (
    <div>
      <Header
        pageTitle="Favorite Recipes"
      />
      <FavAndDoneFilters handleFilter={ handleFilter } />

      <ShareToast isToastVisible={ isToastVisible } />

      <FavDoneCard
        protocol={ protocol }
        host={ host }
        filteredRecipes={ filteredRecipes }
        visibility={ setToastVisibility }
      />
    </div>
  );
}

export default FavoriteRecipes;
