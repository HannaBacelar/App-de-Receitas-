import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { setDarkMode } from '../redux/actions';
import '../styles/Profile.css';

function Profile() {
  const [changeToDonePage, setChangeToDonePage] = useState(false);
  const [changeToFavPage, setChangeToFavPage] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.preferences.darkMode);

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
      <div className="preference-btn toggle-dark">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => dispatch(setDarkMode()) }
        >
          {`Turn ${darkMode ? 'off' : 'on'} dark mode`}
        </button>
      </div>
      <div className="preference-btn logout">
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
