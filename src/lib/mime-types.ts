import {
	mdiFileDocumentOutline,
	mdiFileImageOutline,
	mdiFileOutline,
	mdiFileTableOutline
} from '@mdi/js';

export function getFileIconByMimeType(mimeType: string): string {
	if (
		mimeType === 'application/pdf' ||
		mimeType === 'text/plain' ||
		mimeType === 'application/msword' ||
		mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		mimeType === 'application/vnd.oasis.opendocument.text' ||
		mimeType === 'application/vnd.google-apps.document'
	) {
		return mdiFileDocumentOutline;
	} else if (mimeType.startsWith('image/')) {
		return mdiFileImageOutline;
	} else if (
		mimeType === 'application/vnd.ms-excel' ||
		mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
		mimeType === 'application/vnd.oasis.opendocument.spreadsheet' ||
		mimeType === 'application/vnd.google-apps.spreadsheet'
	) {
		return mdiFileTableOutline;
	} else {
		return mdiFileOutline;
	}
}
