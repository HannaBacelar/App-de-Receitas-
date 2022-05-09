import React from 'react';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore() {
  return (
    <div className="Explore">
      <Header
        pageTitle="Explore"
      />
      <main>
        <Link className="explore-link" to="/explore/foods">
          <button data-testid="explore-foods" type="button">
            <GiKnifeFork className="explore-link-icon" />
            Explore Foods
          </button>
        </Link>
        <Link className="explore-link" to="/explore/drinks">
          <button type="button" data-testid="explore-drinks">
            <BiDrink className="explore-link-icon" />
            Explore Drinks
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
