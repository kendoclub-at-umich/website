export async function showModal(dialog: HTMLDialogElement) {
	dialog.showModal();

	const onClick = (event: MouseEvent) => {
		const content = dialog.firstElementChild;
		if (content != null && event.target != null && !content.contains(event.target as Element)) {
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
