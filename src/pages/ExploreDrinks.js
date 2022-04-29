import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';

function ExploreDrinks() {
  return (
    <div>
      <Header
        pageTitle="Explore Drinks"
      />
      <ExploreButtons />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
