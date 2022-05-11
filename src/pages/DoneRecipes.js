import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FavDoneCard from '../components/FavDoneCard';
import FavAndDoneFilters from '../components/FilterDoneAndFavoritesBtns';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ShareToast from '../components/ShareToast';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const doneRecipes = useSelector((state) => state.savedRecipes.doneRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState([...doneRecipes]);
  const { protocol, host } = window.location;

  const [isToastVisible, setToastVisibility] = useState(false);

  const handleFilter = ({ target }) => {
    document.querySelector('.active')?.classList.remove('active');
    target.classList.add('active');

    if (target.name === 'all') {
      setFilteredRecipes([...doneRecipes]);
      return;
    }
    setFilteredRecipes(doneRecipes
      .filter((recipe) => recipe.type === target.name));
  };

  return (
    <div>
      <Header
        pageTitle="Done Recipes"
      />

      <FavAndDoneFilters handleFilter={ handleFilter } />

      <div className="done-cards-container">
        <ShareToast isToastVisible={ isToastVisible } />
        <FavDoneCard
          protocol={ protocol }
          tagVisibility
          host={ host }
          filteredRecipes={ filteredRecipes }
          visibility={ setToastVisibility }
        />
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
