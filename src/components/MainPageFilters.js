import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

function MainPageFilters({ pageTitle }) {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
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

  useEffect(() => {
    if (typeof filter === 'string') {
      dispatch(fetchRecipes('category', filter, pageTitle));
    }
  }, [filter, pageTitle, dispatch]);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => dispatch(fetchRecipes('any', '', pageTitle)) }
      >
        All
      </button>
      { categories.length > 0 && categories[0].map((cat, i) => {
        const max = 4;
        if (i > max) return;
        return (
          <button
            key={ i }
            type="button"
            name={ cat.strCategory }
            onClick={ ({ target: { name } }) => {
              setFilter((prevState) => {
                if (prevState === name) {
                  return dispatch(fetchRecipes('any', '', pageTitle));
                }
                return name;
              });
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
