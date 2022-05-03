const nationalityApi = async (list) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${list}`);
  const data = await response.json();
  return data;
};
export default nationalityApi;
