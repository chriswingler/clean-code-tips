import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';
import convertToMilliseconds from './utils/convertToMilliseconds';
import intervalSwitch from './utils/intervalSwitch';
import getCategoryString from './utils/getCategoryString';
import displayTip from './utils/displayTip';
import { PrimaryCategories } from './types/types';

const primaryCategories: PrimaryCategories =
  cleanCodeTips['Clean Code Cheat Sheet'];

const categoryString: string = getCategoryString(primaryCategories);

let prevIntervalId: NodeJS.Timeout;

const timer = (): void => {
  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  // initial tip
  displayTip(primaryCategories);

  // Shorthand
  const intervalSetter = (hours: number, minutes: number) => {
    let milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      displayTip(primaryCategories);
    }, milliseconds);
  };

  intervalSwitch(tipTimer, intervalSetter);
};

const updateConfigValues = async (): Promise<any> => {
  const timer = vscode.workspace.getConfiguration();
  await timer.update('tipTimer', timer, vscode.ConfigurationTarget.Global);
};

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

  // Add status bar item
  const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  myStatusBarItem.text = 'Clean Code Tips';

  // // Make a tip show when clicking on status bar item
  myStatusBarItem.command = 'onCommand:extension.displayTip';
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();
}
