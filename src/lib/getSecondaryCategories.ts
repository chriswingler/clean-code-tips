import {SecondaryCategory, Leaf} from '../types/types';

const getSecondaryCategories = (
  secondaryCategories: SecondaryCategory,
  string: string
) => {
  // Transform object into an array of keys, so it can be indexed
  const categoryKeys: Array<string> = Object.keys(secondaryCategories);

  // Grab a random index from array of keys
  const randomCategoryIndex: number = categoryKeys.indexOf(
    categoryKeys[Math.floor(categoryKeys.length * Math.random())]
  );

  // Get the value at that index
  const randomCategoryName: string = categoryKeys[randomCategoryIndex];

  // Use that value to access the matching second category
  const secondaryCategory: Leaf = secondaryCategories[randomCategoryName];

  return (string += ` > ${randomCategoryName} > ${secondaryCategory.text}`);
};

export default getSecondaryCategories;
