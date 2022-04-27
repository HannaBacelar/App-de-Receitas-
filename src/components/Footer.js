import React from 'react';
import '../App.css';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <Link
          to="/drinks"
        >
          <button
            type="button"

          >
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="drinks"
            />
          </button>
        </Link>
        <Link
          to="/explore"
        >
          <button
            type="button"

          >
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="explorar"
            />
          </button>
        </Link>
        <Link
          to="/foods"
        >
          <button
            type="button"

          >
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
              alt="foods"
            />
          </button>
        </Link>
      </footer>
    </div>

  );
}
export default Footer;
