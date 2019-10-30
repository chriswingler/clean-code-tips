import * as vscode from 'vscode';
import displayTip from './utils/displayTip';
import timer from './utils/timer';
import updateConfigValues from './utils/updateConfigValues';
import addTipsStatusBarItem from './utils/addTipsStatusBarItem';

export function activate({ subscriptions }: vscode.ExtensionContext): void {
  subscriptions.push(
    vscode.commands.registerCommand(
      'onCommand:extension.displayTip',
      displayTip
    ),
    vscode.commands.registerCommand('onCommand:config.configureTipTimer', () =>
      updateConfigValues()
    )
  );

  // Display a message box to the user on startup
  timer();

  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('tipTimer')) {
      timer();
    }
  });

  const tipsStatusBarItem = addTipsStatusBarItem();

  subscriptions.push(tipsStatusBarItem);
  tipsStatusBarItem.show();
}
