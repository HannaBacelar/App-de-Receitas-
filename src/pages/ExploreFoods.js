import React from 'react';
import PropTypes from 'prop-types';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods(props) {
  const { history } = props;
  return (
    <div>
      <Header
        pageTitle="Explore Foods"
      />
      <ExploreButtons history={ history } page="Foods" link="foods" showButton />
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreFoods;
