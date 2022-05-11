import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes, setRedirectStatus } from '../redux/actions';

function SearchBar({ pageTitle }) {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  const checkFirstLetter = () => (
    searchValue.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : dispatch(fetchRecipes(searchType, searchValue, pageTitle)));

  const searchClick = (event) => {
    event.preventDefault();
    dispatch(setRedirectStatus(true));
    if (searchType !== 'first-letter-search-radio') {
      dispatch(fetchRecipes(searchType, searchValue, pageTitle));
    } else checkFirstLetter();
  };

  return (
    <div className="search-bar">
      <form>
        <input
          placeholder="Search..."
          type="text"
          data-testid="search-input"
          className="search-input"
          onChange={ ({ target }) => setSearchValue(target.value) }
        />
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ searchClick }
        >
          Go!
        </button>
      </form>
      <div className="radio-buttons">
        <label htmlFor="ingredient-search-radio" className="filter-radio">
          <input
            type="radio"
            name="searchRadio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          {' '}
          Ingredient
          <span className="radiomark" />
        </label>

        <label htmlFor="name-search-radio" className="filter-radio">
          <input
            type="radio"
            name="searchRadio"
            id="name-search-radio"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          {' '}
          Name
          <span className="radiomark" />
        </label>

        <label htmlFor="first-letter-search-radio" className="filter-radio">
          <input
            type="radio"
            name="searchRadio"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          {' '}
          First Letter
          <span className="radiomark" />
        </label>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  fetchRecipes: PropTypes.func,
}.isRequired;

export default SearchBar;
