import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header
        pageTitle="Explore"
      />
      <Link to="/explore/foods">
        <button data-testid="explore-foods" type="button">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      </Link>
    </div>
  );
}

export default Explore;
