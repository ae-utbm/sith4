import { isRTL } from './document';

describe('document', () => {
	it('should be able to determine if the document is in rtl mode', () => {
		document.documentElement.dir = 'rtl';
		expect(isRTL()).toBe(true);
	});

	it('should be able to determine if the document is in ltr mode', () => {
		document.documentElement.dir = 'ltr';
		expect(isRTL()).toBe(false);
	});
});
