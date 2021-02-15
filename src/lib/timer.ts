// @ts-ignore
import * as vscode from 'vscode';
import displayTip from './displayTip';
import displayTipOrTestingTipRandomly from './displayTipOrTestingTipRandomly';
import convertToMilliseconds from './convertToMilliseconds';
import intervalSwitch from './intervalSwitch';

const {displayTestingTips} = vscode.workspace.getConfiguration();

const timer = (): void => {
  let prevIntervalId: NodeJS.Timeout;

  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  if (typeof tipTimer !== 'string') {
    return;
  }

  if (displayTestingTips) {
    displayTipOrTestingTipRandomly();
  } else {
    displayTip();
  }

  const intervalSetter = (hours: number, minutes: number) => {
    const milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      if (displayTestingTips) {
        displayTipOrTestingTipRandomly();
      } else {
        displayTip();
      }
    }, milliseconds);
  };

  intervalSwitch(tipTimer, intervalSetter);
};

export default timer;
