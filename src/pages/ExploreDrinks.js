import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';

function ExploreDrinks(props) {
  const { history } = props;
  return (
    <div>
      <Header
        pageTitle="Explore Drinks"
      />
      <ExploreButtons history={ history } page="Drinks" link="drinks" />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreDrinks;
