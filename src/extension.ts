import * as vscode from 'vscode';
import timer from './utils/timer';
import addTipsStatusBarItem from './utils/addTipsStatusBarItem';
import displayTip from './utils/displayTip';

export function activate({subscriptions}: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration();
  const {displayTipAtStartup} = config;

  if (displayTipAtStartup) {
    // Display a message box to the user
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
}
