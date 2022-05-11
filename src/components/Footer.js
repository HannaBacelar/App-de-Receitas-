import React from 'react';
import {
  FaCheck, FaCompass,
  FaGlassMartiniAlt, FaHeart, FaUtensils,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css';

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
          to="/done-recipes"
          className="footer-btn"
          activeClassName="footer-btn--active"
        >
          <div className="footer-btn--content">
            <FaCheck size="1.2rem" alt="favorite" />
            <span>Done</span>
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
