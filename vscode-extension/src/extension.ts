import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';
import convertToMilliseconds from './utils/convertToMilliseconds';

type categories = {
  [key: string]: { [key: string]: { [key: string]: string } };
};

const recurseThroughTree = (
  categories: any,
  outputString: string = '',
  i: number = 0
): string => {
  if (i < 2) {
    const categoryKeys: Array<string> = Object.keys(categories);
    const randomCategoryIndex: number = categoryKeys.indexOf(
      categoryKeys[Math.floor(categoryKeys.length * Math.random())]
    );
    const randomCategoryName: string = categoryKeys[randomCategoryIndex];
    const randomCategories: string = categories[randomCategoryName];

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

  const timer = () => {
    const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

      // Shorthand
    const displayTip = (hours: number, minutes: number) => {
    let milliseconds = convertToMilliseconds(hours, minutes);

      setInterval( () => {
        outputString = recurseThroughTree(rootDataObj);
        vscode.window.showInformationMessage(outputString);
        },
        milliseconds
      );
    };

    switch (tipTimer) {
      case '5 minutes':
        displayTip(0, 0.1);
        break;
      case '10 minutes':
        displayTip(0, 0.5);
        break;
      case '15 minutes':
        displayTip(0, 15);
        break;
      case '30 minutes':
        displayTip(0, 30);
        break;
      case '1 hour':
        displayTip(1, 0);
        break;
      case '2 hours':
        displayTip(2, 0);
        break;
      case '4 hours':
        displayTip(4, 0);
        break;
      case '8 hours':
        displayTip(8, 0);
        break;
      case '1 day':
        displayTip(24, 0);
        break;
      case '1 week':
        displayTip(168, 0);
        break;
      case '1 month':
        displayTip(730, 0);
        break;
    }
  };

  timer();

  // vscode.workspace.onDidChangeConfiguration(async (e: vscode.ConfigurationChangeEvent) => {
  //   if (e.affectsConfiguration('tipTimer')) {

  //     const tipTimer = await vscode.workspace.getConfiguration().get('tipTimer');

  //     switch (tipTimer) {
  //       case '5 minutes':
  //         // displayTip();
  //         console.log(tipTimer);
  //         break;
  //       case '10 minutes':
  //         // displayTip();
  //         console.log(tipTimer);
  //         break;
  //       case '15 minutes':
  //         // displayTip();
  //         break;
  //       case '30 minutes':
  //         // displayTip();
  //         break;
  //       case '1 hour':
  //         // displayTip();
  //         break;
  //       case '2 hours':
  //         // displayTip();
  //         break;
  //       case '4 hours':
  //         // displayTip();
  //         break;
  //       case '8 hours':
  //         // displayTip();
  //         break;
  //       case '1 day':
  //         // displayTip();
  //         break;
  //       case '1 week':
  //         // displayTip();
  //         break;
  //       case '1 month':
  //         // displayTip();
  //         break;
  //     }
  //   }
  // });

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
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();

  // Display a message box to the user on startup
  outputString = recurseThroughTree(rootDataObj);
  vscode.window.showInformationMessage(outputString);
  
//   const testingToggle = vscode.workspace
//     .getConfiguration('tipsForTestingCode');

//   console.log(testingToggle);

//   switch (testingToggle) {
//     case true:
//       break;
//     case false:
//       break;
//   }
}
