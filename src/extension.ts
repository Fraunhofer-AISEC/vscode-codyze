import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	let codyzePath = context.asAbsolutePath(
		path.join('codyze', 'bin', 'codyze')
	);

	let serverOptions: ServerOptions = {
		run: { command: codyzePath, args: ["-l"] },
		debug: { command: codyzePath, args: ["-l"] }
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'cpp' }, { scheme: 'file', language: 'java' }],
	};

	client = new LanguageClient(
		'vscode-codyze',
		'Codyze',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	
	return client.stop();
}
