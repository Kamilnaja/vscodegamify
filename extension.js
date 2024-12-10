const vscode = require("vscode");
const { calculateScore } = require("./src/calculateScore.mjs");

let startTime;
let keystrokes = 0;
let linesAdded = 0;
let linesRemoved = 0;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "vscodegamify" is now active!');
  startTime = new Date();

  const disposable = vscode.commands.registerCommand(
    "vscodegamify.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from vscodegamify!");
    }
  );

  const disposableStats = vscode.commands.registerCommand(
    "vscodegamify.showStats",
    function () {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000;
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

module.exports = {
  activate,
  deactivate,
};
