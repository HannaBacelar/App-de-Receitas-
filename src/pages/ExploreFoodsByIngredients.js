import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const ingredientsArray = [];
    const fetchIngredients = async () => {
      const response = await fetch(endPoint);
      const results = await response.json();
      const max = 11;
      for (let index = 0; index <= max; index += 1) {
        ingredientsArray.push(results.meals[index]);
      }
      setIngredients(ingredientsArray);
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      <Header
        pageTitle="Explore Ingredients"
      />
      {
        ingredients && ingredients.map((ingredient) => (
          <div key={ ingredient.strIngredient }>{ingredient.strIngredient}</div>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredients;
