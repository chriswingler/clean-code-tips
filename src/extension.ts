import * as vscode from 'vscode';
import timer from './lib/timer';
import addTipsStatusBarItem from './lib/addTipsStatusBarItem';
import displayTip from './lib/displayTip';

export const activate = ({subscriptions}: vscode.ExtensionContext): void => {
  const config = vscode.workspace.getConfiguration();
  const {displayTipAtStartup} = config;

  if (displayTipAtStartup) {
    timer();
  }

  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('tipTimer')) {
      timer();
    }
  });

  const tipsStatusBarItem: vscode.StatusBarItem = addTipsStatusBarItem();

  subscriptions.push(tipsStatusBarItem);
  tipsStatusBarItem.show();

  const displayTipCommand = 'displayTip';
  subscriptions.push(
    vscode.commands.registerCommand(displayTipCommand, () => displayTip())
  );
};
