import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchAPINationality, fetchApiNationalityRecipes } from '../redux/actions';

function ExploreFoodsByNationality() {
  const dispatch = useDispatch();

  const listNationality = useSelector((state) => state.nationality.nationality);
  console.log(listNationality);
  const listNationalityRecipes = useSelector(
    (state) => state.recipesNationality.recipesNationality,
  );

  useEffect(() => {
    dispatch(fetchAPINationality());
    dispatch(fetchApiNationalityRecipes('American'));
  }, []);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Explore Nationalities"
      />

      <select
        data-testid="explore-by-nationality-dropdown"
        name="dropdown"
        onChange={ ({ target: { value } }) => {
          dispatch(fetchApiNationalityRecipes(value));
        } }
      >
        {
          listNationality.map((element, index) => (
            <option
              key={ element.strArea + index }
              data-testid={ `${element.strArea}-option` }
            >
              {element.strArea}
            </option>))
        }
      </select>
      {
        listNationalityRecipes.map((meal, index) => {
          const max = 11;
          if (index > max) return;
          return (<Card
            key={ meal.strMeal + index }
            img={ meal.strMealThumb }
            index={ index }
            title={ meal.strMeal }
          />);
        })
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsByNationality;
