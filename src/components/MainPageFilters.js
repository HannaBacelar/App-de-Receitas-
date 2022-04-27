import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchItemsRecipes } from '../redux/actions';

function MainPageFilters({ pageTitle }) {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('oi');
    const getCategories = async () => {
      let url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      if (pageTitle !== 'Foods') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      }
      const recipes = await fetch(url);
      const obj = await recipes.json();
      const arr = Object.values(obj);
      setCategories(arr);
    };
    getCategories();
  }, [pageTitle]);

  return (
    <div>
      { categories.length > 0 && categories[0].map((cat, i) => {
        console.log(cat);
        const max = 4;
        if (i > max) return;
        return (
          <button
            key={ i }
            type="button"
            name={ cat.strCategory }
            onClick={ ({ target: { name } }) => {
              dispatch(fetchItemsRecipes('category', name, pageTitle));
            } }
            data-testid={ `${cat.strCategory}-category-filter` }
          >
            { cat.strCategory }
          </button>);
      }) }
    </div>);
}

MainPageFilters.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default MainPageFilters;
