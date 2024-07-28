import type { Action } from 'svelte/action';

export const modal: Action<HTMLDialogElement> = (dialog) => {
	const onClick = (event: MouseEvent) => {
		if (dialog == event.target) {
			dialog.close();
		}
	};

	dialog.addEventListener('click', onClick);

	return {
		destroy() {
			dialog.removeEventListener('click', onClick);
		}
	};
};
