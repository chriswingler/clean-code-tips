import transformCategory from './transformCategory';
import getRandomIndexInCategories from './getRandomIndexInCategories';
import addEmojisToPrimaryCategories from './addEmojiToPrimaryCategories';
import getSecondaryCategories from './getSecondaryCategories';
import {PrimaryCategories, PrimaryCategory} from '../types/types';

const getCategoryString = (primaryCategories: PrimaryCategories): string => {
  const categoryKeys: Array<string> = transformCategory(primaryCategories);

  const randomIndex: number = getRandomIndexInCategories(categoryKeys);

  // Get the value at that index
  const randomCategoryName: string = categoryKeys[randomIndex];

  let outputString = `${randomCategoryName} `;

  outputString = addEmojisToPrimaryCategories(outputString, randomCategoryName);

  // Get primary category
  const primaryCategory: PrimaryCategory =
    primaryCategories[randomCategoryName];

  return getSecondaryCategories(primaryCategory, outputString);
};

export default getCategoryString;
