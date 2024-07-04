export async function showModal(dialog: HTMLDialogElement) {
	dialog.showModal();

	const onClick = (event: MouseEvent) => {
		if (dialog == event.target) {
			dialog.close();
		}
	};

	dialog.addEventListener('click', onClick);

	const returnValue = await waitForDialogToClose(dialog);

	dialog.removeEventListener('click', onClick);

	return returnValue;
}

function waitForDialogToClose(dialog: HTMLDialogElement): Promise<string> {
	return new Promise((resolve) => {
		dialog.addEventListener('close', () => {
			resolve(dialog.returnValue);
		});
	});
}
