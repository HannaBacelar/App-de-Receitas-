import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <div>
      <Header
        pageTitle="Explore Foods"
      />
      <ExploreButtons showButton />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
