import { base64 } from 'src/types';

export {};

declare global {
	interface ArrayBuffer {
		/**
		 * Convert an ArrayBuffer to a base64 string
		 * @param {string} type The type of the file @default 'image'
		 * @param {string} extension The extension of the file @default 'png'
		 * @returns {string} The base64 string
		 */
		toBase64(type?: string, extension?: string): base64;
	}
}

if (!ArrayBuffer.prototype.toBase64) {
	ArrayBuffer.prototype.toBase64 = function toBase64(type = 'image', extension = 'png'): base64 {
		let binary = '';
		const bytes = new Uint8Array(this);
		const len = bytes.byteLength;

		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}

		return `data:${type}/${extension};base64,${window.btoa(binary)}`;
	};
}
