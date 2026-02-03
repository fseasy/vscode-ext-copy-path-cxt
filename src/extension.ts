import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const l10n = vscode.l10n;
  // Copy file name
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyRelative.copyFileName",
      async (uri: vscode.Uri) => {
        if (!uri) {
          vscode.window.showWarningMessage("No file selected");
          return;
        }

        const fileName = path.basename(uri.fsPath);
        await vscode.env.clipboard.writeText(fileName);
        vscode.window.showInformationMessage(l10n.t("copied {0}", fileName));
      }
    )
  );

  // Copy path relative to active editor
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyRelative.copyRelativeToActive",
      async (uri: vscode.Uri) => {
        if (!uri) {
          vscode.window.showWarningMessage("No file selected");
          return;
        }

        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
          vscode.window.showWarningMessage("No active editor");
          return;
        }

        const activePath = activeEditor.document.uri.fsPath;
        const baseDir = path.dirname(activePath);

        const relativePath = path.relative(baseDir, uri.fsPath);
        // we can add this by config in the future
        // if (!relativePath.startsWith(".")) {
        //   relativePath = "./" + relativePath;
        // }

        await vscode.env.clipboard.writeText(relativePath);
        vscode.window.showInformationMessage(l10n.t("copied {0}", relativePath));
      }
    )
  );
}

export function deactivate() {}
