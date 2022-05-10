import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FaRegFlag, FaGift } from 'react-icons/fa';
import { MdFoodBank } from 'react-icons/md';

function ExploreButtons(props) {
  const { page, link, showButton } = props;
  const [random, setRandom] = useState({});
  const history = useHistory();

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
      <Link className="explore-link" to={ `/explore/${link}/ingredients` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          <MdFoodBank size="1.5rem" className="explore-link-icon" />
          By Ingredient
        </button>
      </Link>

      { showButton && (
        <Link className="explore-link" to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            <FaRegFlag size="1.2rem" className="explore-link-icon" />
            By Nationality
          </button>
        </Link>
      ) }
      <div className="explore-link">
        <button
          type="button"
          onClick={ getRandomId }
          data-testid="explore-surprise"
        >
          <FaGift size="1.2rem" className="explore-link-icon" />
          Surprise me!
        </button>
      </div>
    </>
  );
}

ExploreButtons.defaultProps = {
  showButton: false,
};

ExploreButtons.propTypes = {
  page: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
};

export default ExploreButtons;
