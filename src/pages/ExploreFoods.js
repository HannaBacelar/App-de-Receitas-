import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function ExploreFoods() {
  return (
    <div className="Explore">
      <Header
        pageTitle="Explore Foods"
      />
      <main>
        <ExploreButtons page="Foods" link="foods" showButton />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
