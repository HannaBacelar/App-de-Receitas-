import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="name-search-radio"
            data-testid="name-search-radio"
          />
          Name
        </label>

        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="searchRadio"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
