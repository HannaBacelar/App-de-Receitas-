import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/ExploreFoodsByIngredients.css';
import { setFoodSearchIngredient } from '../redux/actions/index';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const ingredientsArray = [];
    const fetchIngredients = async () => {
      const results = await fetch(endPoint).then((response) => response.json());
      const max = 11;
      for (let index = 0; index <= max; index += 1) {
        ingredientsArray.push(results.meals[index]);
      }
      setIngredients(ingredientsArray);
    };
    fetchIngredients();
  }, []);

  const handleClick = (value) => {
    dispatch(setFoodSearchIngredient(value));
    history.push('/foods');
  };

  return (
    <div>
      <Header
        pageTitle="Explore Ingredients"
      />
      <div className="cardsDiv">
        {
          ingredients && ingredients.map((e, index) => (
            <button
              type="button"
              className="ingredientCard"
              key={ e.idIngredient }
              value={ e.strIngredient }
              onClick={ () => handleClick(e.strIngredient) }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ e.strIngredient }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                { e.strIngredient }
              </h2>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredients;
