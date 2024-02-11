import axios from "axios";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cohere" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"cohere.helloWorld",
		async () => {
			let message = await vscode.window.showInputBox({
				prompt: "Enter your message",
			});
			axios
				.post("http://127.0.0.1:5000/cohere", { message: message })
				.then(function (response) {
					let output: string = JSON.stringify(response.data, null, 2);
					console.log(output);
					vscode.window.showInformationMessage(output);
				})
				.catch(function (error: any) {
					console.log(error);
				});
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
