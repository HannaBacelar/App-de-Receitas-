const recipesNationalityApi = async (countries) => {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countries}`;
  if (countries === 'All') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
export default recipesNationalityApi;
