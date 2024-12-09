// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

let startTime;
let keystrokes = 0;
let linesAdded = 0;
let linesRemoved = 0;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscodegamify" is now active!');

  startTime = new Date();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "vscodegamify.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from vscodegamify!");
    }
  );

  const disposableStats = vscode.commands.registerCommand(
    "vscodegamify.showStats",
    function () {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000; // time spent in seconds
      const personalScore = calculateScore(
        timeSpent,
        keystrokes,
        linesAdded,
        linesRemoved
      );

      const statsMessage = `
			Time Spent: ${timeSpent} seconds
			Keystrokes: ${keystrokes}
			Lines Added: ${linesAdded}
			Lines Removed: ${linesRemoved}
			Personal Score: ${personalScore}
		`;

      vscode.window.showInformationMessage(statsMessage);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableStats);

  vscode.workspace.onDidChangeTextDocument((event) => {
    const changes = event.contentChanges;
    changes.forEach((change) => {
      keystrokes += change.text.length;
      const lines = change.text.split("\n").length - 1;
      if (change.rangeLength > 0) {
        linesRemoved += change.rangeLength;
      }
      linesAdded += lines;
    });
  });
}

// This method is called when your extension is deactivated
function deactivate() {}

function calculateScore(timeSpent, keystrokes, linesAdded, linesRemoved) {
  // Simple scoring algorithm
  return timeSpent / 60 + keystrokes / 100 + linesAdded * 2 - linesRemoved;
}

module.exports = {
  activate,
  deactivate,
};
