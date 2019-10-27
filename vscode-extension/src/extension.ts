import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';

type categories = {
  [key: string]: { [key: string]: { [key: string]: string } };
};

const recurseThroughTree = (
  categories: any | { text: string; type: string },
  outputString: string = '',
  i: number = 0
): string => {
  if (i < 2) {
    const categoryKeys: Array<string> = Object.keys(categories);
    const randomCategoryIndex: number = categoryKeys.indexOf(
      categoryKeys[Math.floor(categoryKeys.length * Math.random())]
    );
    const randomCategoryName: string = categoryKeys[randomCategoryIndex];
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
    if (categories.type === '-') {
      outputString += 'Bad: ';
    } else {
      outputString += 'Good: ';
    }

    outputString += categories.text;
    return outputString;
  }
};

const rootDataObj: categories = cleanCodeTips['Clean Code Cheat Sheet'];

export function activate({ subscriptions }: vscode.ExtensionContext) {
  let outputString: string = '';

  vscode.workspace.onDidChangeConfiguration(async (e: vscode.ConfigurationChangeEvent) => {
    if (e.affectsConfiguration('tipTimer')) {

      // 1) Getting the value
      const value = await vscode.workspace.getConfiguration().get('tipTimer');
      await console.log(value);
      
      console.log('TIMESTAMP ' + Date.now());
    }
  });

  subscriptions.push(
    vscode.commands.registerCommand('onCommand:extension.displayTip', () => {
      outputString = recurseThroughTree(rootDataObj);

      // Display a message box to the user per click
      vscode.window.showInformationMessage(outputString);
    }),

    vscode.commands.registerCommand('onCommand:config.configureTipTimer', () => {
      const updateConfigValues = async () => {
        const timer = vscode.workspace.getConfiguration('cleanCode.tipTimer');
        await timer.update('tipTimer', "15 minutes", vscode.ConfigurationTarget.Global);
        
        const testingTips = vscode.workspace.getConfiguration('cleanCode.tipsForTestingCode');
        await testingTips.update('tipsForTestingCode', false, vscode.ConfigurationTarget.Global);


      };
    
      updateConfigValues();
    })
  );

  // Add status bar item
  const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  myStatusBarItem.text = 'Clean Code Tips';

  // // Make a tip show when clicking on status bar item
  myStatusBarItem.command = 'onCommand:extension.displayTip';

  outputString = recurseThroughTree(rootDataObj);

  // Display a message box to the user on startup
  vscode.window.showInformationMessage(outputString);
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();

  // Shorthand
  // const displayTip = () =>
  //   vscode.commands.executeCommand('extension.displayTip');

  // Add settings page
  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  switch (tipTimer) {
    case '5 minutes':
      // displayTip();
      console.log('5 minutes!!')
      break;
    case '10 minutes':
      // displayTip();
      console.log('10 minutes!!')
      break;
    case '15 minutes':
      // displayTip();
      break;
    case '30 minutes':
      // displayTip();
      break;
    case '1 hour':
      // displayTip();
      break;
    case '2 hours':
      // displayTip();
      break;
    case '4 hours':
      // displayTip();
      break;
    case '8 hours':
      // displayTip();
      break;
    case '1 day':
      // displayTip();
      break;
    case '1 week':
      // displayTip();
      break;
    case '1 month':
      // displayTip();
      break;
  }

//   const testingToggle = vscode.workspace
//     .getConfiguration('tipsForTestingCode');

//   console.log(testingToggle);

//   switch (testingToggle) {
//     case true:
//       break;
//     case false:
//       break;
//   }
// }
