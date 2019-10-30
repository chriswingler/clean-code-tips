import * as vscode from 'vscode';
import getCategoryString from './getCategoryString';
import { PrimaryCategories } from '../types/types';

const displayTip = (primaryCategories: PrimaryCategories): void => {
  const outputString = getCategoryString(primaryCategories);
  vscode.window.showInformationMessage(outputString);
};

export default displayTip;
