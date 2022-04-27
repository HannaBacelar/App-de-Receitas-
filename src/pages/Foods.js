import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

function Foods({ history }) {
  const foods = useSelector((state) => state.foods.recipes.meals);

  useEffect(() => {
    if (!foods) return;
    const firstMealId = foods[0].idMeal;
    if (foods.length === 1) history.push(`/foods/${firstMealId}`);
  }, [foods, history]);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Foods"
      />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
