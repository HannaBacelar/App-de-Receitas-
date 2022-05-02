export function getTodaysDate() {
  const currentDate = new Date();

  return currentDate.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

export function getDoneRecipeObject(id, type, recipe) {
  return { id,
    type: type === 'Drink' ? 'drink' : 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: recipe?.strAlcoholic || '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: getTodaysDate(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
}
