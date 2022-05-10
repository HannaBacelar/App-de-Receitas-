import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';
import '../styles/Explore.css';

function ExploreDrinks() {
  return (
    <div className="Explore">
      <Header
        pageTitle="Explore Drinks"
      />
      <main>
        <ExploreButtons page="Drinks" link="drinks" />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
