import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const [changeToDonePage, setChangeToDonePage] = useState(false);
  const [changeToFavPage, setChangeToFavPage] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleClearClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  return (
    <div>
      <Header
        pageTitle="Profile"
      />
      <section>
        <h2
          data-testid="profile-email"
        >
          { localStorage.getItem('user') }
        </h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          name="donePage"
          onClick={ () => setChangeToDonePage(!changeToDonePage) }
        >
          Done Recipes
        </button>
        {changeToDonePage && <Redirect to="/done-recipes" /> }
        <button
          type="button"
          data-testid="profile-favorite-btn"
          name="favPage"
          onClick={ () => setChangeToFavPage(!changeToFavPage) }
        >
          Favorite Recipes
        </button>
        {changeToFavPage && <Redirect to="/favorite-recipes" /> }
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClearClick }
        >
          Logout
        </button>
        { logout && <Redirect to="/" />}
      </section>
    </div>
  );
}

export default Profile;
