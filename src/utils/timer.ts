import * as vscode from 'vscode';
import displayTip from './displayTip';
import convertToMilliseconds from './convertToMilliseconds';
import intervalSwitch from './intervalSwitch';

const timer = (): void => {
  let prevIntervalId: NodeJS.Timeout;

  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  if (typeof tipTimer !== 'string') {
    return;
  }

  // initial tip
  displayTip();

  // Shorthand
  const intervalSetter = (hours: number, minutes: number) => {
    const milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      displayTip();
    }, milliseconds);
  };

  intervalSwitch(tipTimer, intervalSetter);
};

export default timer;
