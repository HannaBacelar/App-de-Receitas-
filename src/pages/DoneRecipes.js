import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FavDoneCard from '../components/FavDoneCard';
import FavAndDoneFilters from '../components/FilterDoneAndFavoritesBtns';
import Header from '../components/Header';
import ShareToast from '../components/ShareToast';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const doneRecipes = useSelector((state) => state.savedRecipes.doneRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState([...doneRecipes]);
  const { protocol, host } = window.location;

  const [isToastVisible, setToastVisibility] = useState(false);

  const handleFilter = ({ target: { name } }) => {
    if (name === 'all') {
      setFilteredRecipes([...doneRecipes]);
      return;
    }
    setFilteredRecipes(doneRecipes
      .filter((recipe) => recipe.type === name));
  };

  return (
    <div>
      <Header
        pageTitle="Done Recipes"
      />

      <FavAndDoneFilters handleFilter={ handleFilter } />

      <ShareToast isToastVisible={ isToastVisible } />

      <FavDoneCard
        protocol={ protocol }
        tagVisibility
        host={ host }
        filteredRecipes={ filteredRecipes }
        visibility={ setToastVisibility }
      />

    </div>
  );
}

export default DoneRecipes;
