/**
 * Determines if the document is in rtl mode.
 * @returns {boolean} true if the text is rtl, false otherwise
 */
export function isRTL(): boolean {
	return document.documentElement.dir === 'rtl';
}
