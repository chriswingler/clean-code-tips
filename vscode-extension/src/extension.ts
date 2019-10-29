import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';
import convertToMilliseconds from './utils/convertToMilliseconds';
import intervalSwitch from './utils/intervalSwitch';

interface Leaf {
  text: string;
  type: string;
}

interface SecondaryCategories {
  [key: string]: Leaf;
}

interface Categories {
  [key: string]: SecondaryCategories;
}

const primaryCategories: Categories =
  cleanCodeTips['Clean Code Cheat Sheet'];

  // TODO inspect to see if recursion is necessary here
const recurseThroughTree = (
  categories?: Categories | SecondaryCategories,
  outputString: string = '',
  leaf?: Leaf,
): string => {

  // Exit case
  if (leaf) {
      outputString += leaf.text;
      return outputString;
  }

  // TODO inspect the following to see if all are necessary

  // Transform object into an array of keys, so it can be indexed
  const categoryKeys: Array<string> = Object.keys(primaryCategories);

  // Grab a random index from array of keys
  const randomCategoryIndex: number = categoryKeys.indexOf(
    categoryKeys[Math.floor(categoryKeys.length * Math.random())]
  );

  // Get the value at that index
  const randomCategoryName: string = categoryKeys[randomCategoryIndex];

  // Use that value to access the matching second category
  const SecondaryCategories: SecondaryCategories = primaryCategories[randomCategoryName];

  if (categories as SecondaryCategories) {
    outputString += ` > ${randomCategoryName} > `;
    return recurseThroughTree(categories, outputString, leaf);
  }

  if (categories as Categories) {
    {
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
    }

      return recurseThroughTree(SecondaryCategories, outputString);
  }
};

const displayTip = (): void => {
  const rootDataObj: Categories = cleanCodeTips['Clean Code Cheat Sheet'];
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
