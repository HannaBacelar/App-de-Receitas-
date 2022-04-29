import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ExploreButtons(props) {
  const { page, link, showButton, history } = props;
  const [random, setRandom] = useState({});

  const getRandomId = () => (showButton
    ? history.push(`/foods/${random.idMeal}`)
    : history.push(`/drinks/${random.idDrink}`));

  useEffect(() => {
    const getRandomItem = async () => {
      let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      if (page !== 'Foods') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      }
      const recipes = await fetch(url);
      const obj = await recipes.json();
      const arr = Object.values(obj);
      setRandom(arr[0][0]);
    };
    getRandomItem();
  }, [page]);

  return (
    <>
      <Link to={ `/explore/${link}/ingredients` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>

      { showButton && (
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
      ) }
      <button
        type="button"
        onClick={ getRandomId }
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </>
  );
}

ExploreButtons.defaultProps = {
  showButton: false,
};

ExploreButtons.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
};

export default ExploreButtons;
