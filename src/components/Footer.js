import React from 'react';
import '../App.css';
import '../styles/footer.css';
import { NavLink } from 'react-router-dom';
import { FaUtensils, FaHeart, FaCompass, FaGlassMartiniAlt } from 'react-icons/fa';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <NavLink
          to="/foods"
          activeClassName="footer-btn--active"
          className="footer-btn"
        >
          <div className="footer-btn--content">
            <FaUtensils size="1.2rem" data-testid="food-bottom-btn" alt="foods" />
            <span>Foods</span>
          </div>
        </NavLink>
        <NavLink
          to="/drinks"
          activeClassName="footer-btn--active"
          className="footer-btn"
        >
          <div className="footer-btn--content">
            <FaGlassMartiniAlt
              size="1.2rem"
              data-testid="drinks-bottom-btn"
              alt="drinks"
            />
            <span>Drinks</span>
          </div>
        </NavLink>
        <NavLink
          to="/explore"
          className="footer-btn"
          activeClassName="footer-btn--active"
        >
          <div className="footer-btn--content">
            <FaCompass size="1.2rem" data-testid="explore-bottom-btn" alt="explore" />
            <span>Explore</span>
          </div>
        </NavLink>
        <NavLink
          to="/favorite-recipes"
          className="footer-btn"
          activeClassName="footer-btn--active"
        >
          <div className="footer-btn--content">
            <FaHeart size="1.2rem" alt="favorite" />
            <span>Favorites</span>
          </div>
        </NavLink>
      </footer>
    </div>

  );
}
export default Footer;
