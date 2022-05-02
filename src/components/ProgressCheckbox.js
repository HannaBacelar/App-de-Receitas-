import PropTypes from 'prop-types';
import React from 'react';

function ProgressCheckbox({ index, recipe, checkedIngredients, changeHandler }) {
  return (
    <label
      htmlFor={ `ingredient-${index}-checkbox` }
      className={
        `ingredients-checkbox ${checkedIngredients.includes(index) ? 'striked' : ''}`
      }
      data-testid={ `${index - 1}-ingredient-step` }
    >
      <input
        type="checkbox"
        id={ `ingredient-${index}-checkbox` }
        onChange={ () => changeHandler(index) }
        checked={ checkedIngredients.includes(index) }
      />
      {`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}
    </label>
  );
}

ProgressCheckbox.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.objectOf(PropTypes.any),
  checkedIngredients: PropTypes.arrayOf(PropTypes.number),
  changeHandler: PropTypes.func,
}.isRequired;

export default ProgressCheckbox;
