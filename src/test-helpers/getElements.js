import { screen } from '@testing-library/react';

const getElements = async (type) => {
  let video;
  if (type === 'food') video = await screen.findByTestId('video');
  const photo = await screen.findByTestId('recipe-photo');
  const title = await screen.findByTestId('recipe-title');
  const category = await screen.findByTestId('recipe-category');
  const shareBtn = await screen.findByTestId('share-btn');
  const favoriteBtn = await screen.findByTestId('favorite-btn');
  const recommendations = await screen.findAllByTestId(/-recomendation-card/);
  const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

  return { photo,
    title,
    category,
    shareBtn,
    favoriteBtn,
    recommendations,
    video,
    startRecipeBtn };
};

export default getElements;
