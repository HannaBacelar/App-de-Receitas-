import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

function Profile() {
  const [changeToDonePage, setChangeToDonePage] = useState(false);
  const [changeToFavPage, setChangeToFavPage] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    setUserEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleClearClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  return (
    <div>
      <Header
        pageTitle="Profile"
      />
      <section className="profile-container">
        <h2
          data-testid="profile-email"
        >
          Hello,
          {' '}
          <span>{ userEmail.email }</span>
        </h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          name="donePage"
          onClick={ () => setChangeToDonePage(!changeToDonePage) }
        >
          <FaHeart size="1.2rem" className="button-icons" />
          Done Recipes
        </button>
        {changeToDonePage && <Redirect to="/done-recipes" /> }
        <button
          type="button"
          data-testid="profile-favorite-btn"
          name="favPage"
          onClick={ () => setChangeToFavPage(!changeToFavPage) }
        >
          <FaCheckCircle size="1.2rem" className="button-icons" />
          Favorite Recipes
        </button>
        {changeToFavPage && <Redirect to="/favorite-recipes" /> }
      </section>
      <div className="logout-btn">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClearClick }
        >
          Logout
        </button>
      </div>
      { logout && <Redirect to="/" />}
      <Footer />
    </div>
  );
}

export default Profile;
