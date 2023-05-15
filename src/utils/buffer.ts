/**
 * Convert an ArrayBuffer to a base64 string
 * @param {ArrayBuffer} buffer The buffer to convert
 * @returns {string} The base64 string
 */
export function toBase64(buffer: ArrayBuffer): string {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}
