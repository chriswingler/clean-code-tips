import * as vscode from 'vscode';

const updateConfigValues = async (): Promise<any> => {
  const timer = vscode.workspace.getConfiguration();
  await timer.update('tipTimer', timer, vscode.ConfigurationTarget.Global);
};

export default updateConfigValues;
