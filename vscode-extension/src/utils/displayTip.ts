import * as vscode from 'vscode';
import getCategoryString from './getCategoryString';
import { PrimaryCategories } from '../types/types';
import * as cleanCodeTips from '../../../cleancodecheatsheet2.4.json';

const primaryCategories: PrimaryCategories =
  cleanCodeTips['Clean Code Cheat Sheet'];

const displayTip = (): void => {
  const outputString = getCategoryString(primaryCategories);
  vscode.window.showInformationMessage(outputString);
};

export default displayTip;
