import * as vscode from 'vscode';

const addTipsStatusBarItem = () => {
  // Add status bar item
  const tipsStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  tipsStatusBarItem.text = 'Clean Code Tips';

  // Make a tip show when clicking on status bar item
  tipsStatusBarItem.command = 'displayTip';

  return tipsStatusBarItem;
};

export default addTipsStatusBarItem;
