import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, img, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        alt={ title }
        data-testid={ `${index}-card-img` }
        src={ img }
      />
      <h2 data-testid={ `${index}-card-name` }>{title}</h2>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Card;
