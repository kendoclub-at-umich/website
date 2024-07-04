export async function showModal(dialog: HTMLDialogElement) {
	dialog.showModal();

	const onClick = (event: MouseEvent) => {
		if (dialog == event.target) {
			dialog.close();
		}
	};

	dialog.addEventListener('click', onClick);

	await waitForDialogToClose(dialog);

	dialog.removeEventListener('click', onClick);
}

function waitForDialogToClose(dialog: HTMLDialogElement) {
	return new Promise<void>((resolve) => {
		dialog.addEventListener('close', () => {
			resolve();
		});
	});
}
