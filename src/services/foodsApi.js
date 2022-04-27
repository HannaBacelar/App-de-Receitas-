const urlBuilder = (type, value) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  switch (type) {
  case 'category':
    return url.concat(`filter.php?c=${value}`);
  case 'any':
    return url.concat('search.php?s=');
  case 'ingredient-search-radio':
    return url.concat(`filter.php?i=${value}`);
  case 'name-search-radio':
    return url.concat(`search.php?s=${value}`);
  case 'first-letter-search-radio':
    return url.concat(`search.php?f=${value}`);
  default:
    break;
  }
  return url;
};

const fetchFoods = async (type, value) => {
  const url = urlBuilder(type, value);
  const response = await fetch(url);
  const obj = await response.json();

  return obj;
};

export default fetchFoods;
