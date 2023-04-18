import './object';

describe('object', () => {
	describe('isObject', () => {
		it('should return true if the given item is a JS Object', () => {
			expect(Object.isObject({})).toBeTrue();
			expect(Object.isObject({ a: 1 })).toBeTrue();
			expect(Object.isObject({ a: 1, b: {} })).toBeTrue();
		});

		it('should return false if the given item is not a JS Object', () => {
			expect(Object.isObject([])).toBeFalse();
			expect(Object.isObject('')).toBeFalse();
			expect(Object.isObject(1)).toBeFalse();
			expect(Object.isObject(true)).toBeFalse();
			expect(Object.isObject(null)).toBeFalse();
			expect(Object.isObject(undefined)).toBeFalse();
		});
	});

	describe('merge', () => {
		it('should merge two or more objects into the first one', () => {
			expect(Object.merge({ a: 1, b: 2 }, { b: 3, c: { d: 1 } })).toEqual({ a: 1, b: 3, c: { d: 1 } });
			expect(Object.merge({}, { a: 1 })).toEqual({ a: 1 });
			expect(Object.merge({ a: 1 }, {})).toEqual({ a: 1 });
			expect(Object.merge({ a: true }, { b: '2' }, { c: 3 })).toEqual({ a: true, b: '2', c: 3 });
		});
	});
});
