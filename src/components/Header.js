import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header(props) {
  const { displaySearch, pageTitle } = props;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <header>
      <div className="header-top-row">
        <h1 data-testid="page-title">{ pageTitle }</h1>
        <div className="icons">
          {displaySearch && (
            <FaSearch
              type="button"
              className="search-button"
              onClick={ () => setDisplaySearchBar(!displaySearchBar) }
            />
          )}
          <Link
            to="/profile"
          >
            <FaUser
              to="/profile"
              className="profile-icon"
            />
          </Link>
        </div>
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
