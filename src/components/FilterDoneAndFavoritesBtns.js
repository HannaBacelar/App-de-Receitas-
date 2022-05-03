import React from 'react';
import PropTypes from 'prop-types';

function FavAndDoneFilters({ handleFilter }) {
  return (
    <>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ (event) => handleFilter(event) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ (event) => handleFilter(event) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ (event) => handleFilter(event) }
      >
        Drinks
      </button>

    </>
  );
}

FavAndDoneFilters.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default FavAndDoneFilters;
