import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItemsRecipes } from '../redux/actions';

function SearchBar(props) {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const checkFirstLetter = () => {
    const { fetchRecipes, pageTitle } = props;
    return searchValue.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : fetchRecipes(searchType, searchValue, pageTitle);
  };

  const searchClick = () => {
    const { fetchRecipes, pageTitle } = props;
    console.log(pageTitle);
    return searchType !== 'first-letter-search-radio'
      ? fetchRecipes(searchType, searchValue, pageTitle)
      : checkFirstLetter();
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchValue(target.value) }
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          Ingredient
        </label>

        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="name-search-radio"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          Name
        </label>

        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          First Letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ searchClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (type, value, page) => dispatch(fetchItemsRecipes(type, value, page)),
});

SearchBar.propTypes = {
  fetchRecipes: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
