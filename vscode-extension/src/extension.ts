import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';

type categories = { [key: string]: { [key: string]: { [key: string]: string } } };

const recurseThroughTree = (categories: any | { text: string, type: string }, outputString: string = '', i: number = 0): string => {
  if (i < 2) {
    const categoryKeys: Array<string> = Object.keys(categories);
    const randomCategoryIndex: number = categoryKeys.indexOf(categoryKeys[Math.floor(categoryKeys.length * Math.random())]);
    const randomCategoryName: string = categoryKeys[randomCategoryIndex];
    const randomCategories: any = categories[randomCategoryName];

    if (i === 0) {

      outputString += `${randomCategoryName} `;

      switch(randomCategoryName) {
        case "Principles":
          outputString += "🗽";
          break;
        case "Smells":
          outputString += "💩";
          break;
        case "Class Design":
          outputString += "🧱";
          break;
        case "Package Cohesion":
          outputString += "📦";
          break;
        case "Package Coupling":
          outputString += "🧑‍🤝‍🧑";
          break;
        case "General":
          outputString += "📖";
          break;
        case "Environment":
          outputString += "🌎";
          break;
        case "Dependency Injection":
          outputString += "💉";
          break;
        case "Design":
          outputString += "✍";
          break;
        case "Dependencies":
          outputString += "👨‍👧‍👦";
          break;
        case "Naming":
          outputString += "🏷";
          break;
        case "Understandability":
          outputString += "📖";
          break;
        case "Methods":
          outputString += "🏃";
          break;
        case "Source Code Structure":
          outputString += "🏗";
          break;
        case "Conditionals":
          outputString += "👈👉";
          break;
        case "Useless Stuff":
          outputString += "🗑";
          break;
        case "Maintainability Killers":
          outputString += "🔧";
          break;
        case "Exception Handling":
          outputString += "🚸";
          break;
        case "How to Learn Clean Code":
          outputString += "👨‍🏫";
          break;
        case "Refactoring Patterns":
          outputString += "🔨";
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

const rootDataObj: categories = cleanCodeTips["Clean Code Cheat Sheet"];

export function activate({ subscriptions }: vscode.ExtensionContext) {
  let outputString: string = '';

  subscriptions.push(vscode.commands.registerCommand("onCommand:extension.displayTip", () => {
    outputString = recurseThroughTree(rootDataObj);
  
    // Display a message box to the user
    vscode.window.showInformationMessage(
      outputString
    );
  }));

  // Add status bar item
  const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  myStatusBarItem.text = "Clean Code Tips";
  
  // Make a tip show when clicking on status bar item
  myStatusBarItem.command = "onCommand:extension.displayTip";

  outputString = recurseThroughTree(rootDataObj);

  // Display a message box to the user
  vscode.window.showInformationMessage(
    outputString
    // 'Principles 🗽 > High Cohesion: Cohesion is the degree to which elements of a whole belong together. \nMethods and fields in a single class and classes of a component should have \nhigh cohesion. High cohesion in classes and components results in simpler, \nmore easily understandable code structure and design. \n'
  );

	subscriptions.push(myStatusBarItem);
	myStatusBarItem.show();
}