// @ts-ignore
import * as vscode from 'vscode';
import timer from './lib/timer';
import addTipsStatusBarItem from './lib/addTipsStatusBarItem';
import displayTip from './lib/displayTip';
import displayTipOrTestingTipRandomly from './lib/displayTipOrTestingTipRandomly';

export const activate = async ({
  subscriptions,
}: vscode.ExtensionContext): Promise<void> => {
  const config = vscode.workspace.getConfiguration();
  const {
    displayTipAtStartup,
    seenTestingTipReleaseNotice,
    displayTestingTips,
  } = config;

  if (!seenTestingTipReleaseNotice) {
    const noticeMessage = `Clean Code Tips thanks for your support!
    We've added an option to show tips about unit testing
    and test driven development.  Would you like to enable
    these?  If not, you can enable them at any time in the
    extension preferences.
    `;

    const selection = await vscode.window.showInformationMessage(
      noticeMessage,
      'Yes',
      'No thanks'
    );

    selection === 'Yes' &&
      (await config.update(
        'displayTestingTips',
        true,
        vscode.ConfigurationTarget.Global
      ));

    await config.update(
      'seenTestingTipReleaseNotice',
      true,
      vscode.ConfigurationTarget.Global
    );
  }

  if (displayTipAtStartup) {
    timer();
  }

  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('tipTimer')) {
      timer();
    }
  });

  const tipsStatusBarItem = addTipsStatusBarItem();

  subscriptions.push(tipsStatusBarItem);
  tipsStatusBarItem.show();

  const displayTipCommand = 'displayTip';
  subscriptions.push(
    vscode.commands.registerCommand(displayTipCommand, () => {
      if (displayTestingTips) {
        displayTipOrTestingTipRandomly();
      } else {
        displayTip();
      }
    })
  );
};
