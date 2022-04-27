import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { displaySearch, pageTitle } = props;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <header>
      <div>
        <Link
          to="/profile"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt=""
          />
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        {displaySearch && (
          <button
            type="button"
            onClick={ () => setDisplaySearchBar(!displaySearchBar) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt=""
            />
          </button>
        )}
      </div>
      { displaySearchBar && <SearchBar pageTitle={ pageTitle } /> }
    </header>
  );
}

Header.defaultProps = {
  displaySearch: false,
};

Header.propTypes = {
  displaySearch: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
