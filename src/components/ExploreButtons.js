import React from 'react';
import PropTypes from 'prop-types';

function ExploreButtons(props) {
  const { showButton } = props;
  return (
    <>
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </button>

      { showButton && (
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      ) }

      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise Me!
      </button>
    </>
  );
}

ExploreButtons.defaultProps = {
  showButton: false,
};

ExploreButtons.propTypes = {
  showButton: PropTypes.bool,
};

export default ExploreButtons;
