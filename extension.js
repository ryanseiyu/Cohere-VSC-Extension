// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
class CohereDataProvider {
	getTreeItem(element) {
		return element;
	}

	getChildren(element) {
		if (element) {
			return Promise.resolve([]);
		} else {
			const item = new vscode.TreeItem("Hello, Cohere!");
			item.command = { command: "cohere.openWebview", title: "Open Webview" };
			return Promise.resolve([item]);
		}
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rk" is now active!');

	const dataProvider = new CohereDataProvider();
	vscode.window.registerTreeDataProvider("Cohere", dataProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand("cohere.openWebview", function () {
			const panel = vscode.window.createWebviewPanel(
				"cohereWebview",
				"Cohere Webview",
				vscode.ViewColumn.One,
				{
					enableScripts: true, // Enables JavaScript in the webview
				}
			);

			panel.webview.html = getWebviewContent();
		})
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"rk.helloWorld",
		function () {
			context.subscriptions.push(
				vscode.commands.registerCommand("Cohere", function () {
					const panel = vscode.window.createWebviewPanel(
						"Cohere",
						"Cohere Chat View",
						vscode.ViewColumn.One,
						{
							enableScripts: true, // Enables JavaScript in the webview
						}
					);

					panel.webview.html = getWebviewContent();
				})
			);

			let message = "What year was he born?"; // Replace this with the actual message you want to send

			axios
				.post("http://127.0.0.1:5000/cohere", { message: message })
				.then(function (response) {
					// Convert the JSON object to a string to display it
					let output = JSON.stringify(response.data, null, 2);
					console.log(output);
					vscode.window.showInformationMessage(output);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	);

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cohere Chat Sidebar</title>
        </head>
        <body>
            <h1>Welcome to My Extension Sidebar!</h1>
        </body>
        </html>`;
}

exports.activate = activate;

// This method is called when your extension is deactivated
// function deactivate() {}
// module.exports = {
// 	activate,
// 	deactivate,
// };
