import PropTypes from 'prop-types';
import React from 'react';

function FavAndDoneFilters({ handleFilter }) {
  return (
    <div className="main-page-buttons">
      <button
        type="button"
        className="filter-btn active"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ (event) => handleFilter(event) }
      >
        All
      </button>
      <button
        type="button"
        className="filter-btn"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ (event) => handleFilter(event) }
      >
        Foods
      </button>
      <button
        type="button"
        className="filter-btn"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ (event) => handleFilter(event) }
      >
        Drinks
      </button>

    </div>
  );
}

FavAndDoneFilters.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default FavAndDoneFilters;
