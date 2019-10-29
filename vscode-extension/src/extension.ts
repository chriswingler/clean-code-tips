import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';
import convertToMilliseconds from './utils/convertToMilliseconds';
import intervalSwitch from './utils/intervalSwitch';

type categoryLeaf = {
  text: string;
  type: string;
};

type secondaryCategory = {
  [key: string]: categoryLeaf
};

type primaryCategory = {
  [key: string]: secondaryCategory
};

type primaryCategories = {
  [key: string]: primaryCategory
};

type cleanCodeData = {
  [key: string]: primaryCategories
};

const cleanCodeData = cleanCodeTips['Clean Code Cheat Sheet'];

const recurseThroughTree = (
  categories: any,
  outputString: string = '',
  i: number = 0
): string => {
  // first or second level category
  if (i < 2) {
    // pick a random top level, and sub level category
    // then pick a random leaf node
    const categoryKeys: Array<string> = Object.keys(categories);
    const randomCategoryIndex: number = categoryKeys.indexOf(
      categoryKeys[Math.floor(categoryKeys.length * Math.random())]
    );
    const randomCategoryName: any = categoryKeys[randomCategoryIndex];
    const randomCategories: any = categories[randomCategoryName];

    if (i === 0) {
      outputString += `${randomCategoryName} `;

      switch (randomCategoryName) {
        case 'Principles':
          outputString += '🗽';
          break;
        case 'Smells':
          outputString += '💩';
          break;
        case 'Class Design':
          outputString += '🧱';
          break;
        case 'Package Cohesion':
          outputString += '📦';
          break;
        case 'Package Coupling':
          outputString += '🧑‍🤝‍🧑';
          break;
        case 'General':
          outputString += '📖';
          break;
        case 'Environment':
          outputString += '🌎';
          break;
        case 'Dependency Injection':
          outputString += '💉';
          break;
        case 'Design':
          outputString += '✍';
          break;
        case 'Dependencies':
          outputString += '👨‍👧‍👦';
          break;
        case 'Naming':
          outputString += '🏷';
          break;
        case 'Understandability':
          outputString += '📖';
          break;
        case 'Methods':
          outputString += '🏃';
          break;
        case 'Source Code Structure':
          outputString += '🏗';
          break;
        case 'Conditionals':
          outputString += '👈👉';
          break;
        case 'Useless Stuff':
          outputString += '🗑';
          break;
        case 'Maintainability Killers':
          outputString += '🔧';
          break;
        case 'Exception Handling':
          outputString += '🚸';
          break;
        case 'How to Learn Clean Code':
          outputString += '👨‍🏫';
          break;
        case 'Refactoring Patterns':
          outputString += '🔨';
          break;
      }
    } else {
      outputString += ` > ${randomCategoryName} > `;
    }

    i = i + 1;

    return recurseThroughTree(randomCategories, outputString, i);
  } else {
    outputString += categories.text;
    return outputString;
  }
};

const displayTip = (): void => {
  const rootDataObj: any = cleanCodeTips['Clean Code Cheat Sheet'];

  const outputString = recurseThroughTree(rootDataObj);
  vscode.window.showInformationMessage(outputString);
};

let prevIntervalId: NodeJS.Timeout;

const timer = (): void => {
  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  // initial tip
  displayTip();

  // Shorthand
  const intervalSetter = (hours: number, minutes: number) => {
    let milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      displayTip();
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
