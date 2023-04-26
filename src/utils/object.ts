export {};

declare global {
	interface Object {
		/**
		 * Deep merge two or more objects into the first one
		 * @param {object} target The object to merge into
		 * @param {...object} sources The objects to merge into the target
		 *
		 * @example Object.merge({ a: 1, b: 2 }, { b: 3, c: 4 }) // { a: 1, b: 3, c: 4 }
		 * @example Object.merge({ a: 1, b: { c: 2, d: 3 } }, { b: { d: 4, e: 5 } }) // { a: 1, b: { c: 2, d: 4, e: 5 } }
		 */
		merge<T, S>(target: T, ...sources: Array<Partial<T & Record<string, unknown>>>): T & Record<string, unknown>;

		/**
		 * Check if the given item is a JS Object
		 * @param {unknown} item to be tested
		 * @returns {boolean} true if the item is a JS Object
		 *
		 * @example Object.isObject({}) // true
		 * @example Object.isObject({ a: 1 }) // true
		 * @example Object.isObject({ a: 1, b: {} }) // true
		 * @example Object.isObject([]) // false
		 */
		isObject(item: unknown): boolean;
	}
}

if (!Object.prototype.isObject) {
	Object.defineProperty(Object.prototype, 'isObject', {
		value: (item: unknown): boolean => {
			return item !== undefined && item !== null && typeof item === 'object' && !Array.isArray(item);
		},
		configurable: true,
		writable: true,
	});
}

if (!Object.prototype.merge) {
	Object.defineProperty(Object.prototype, 'merge', {
		value: (target: object, ...sources: object[]) => {
			if (!sources.length) return target;
			const source: Record<string, unknown> = sources.shift() as Record<string, unknown>;

			if (Object.isObject(target) && Object.isObject(source)) {
				for (const key in source) {
					if (Object.isObject(source[key])) {
						if (!(target as Record<string, object>)[key]) Object.assign(target, { [key]: {} });
						Object.merge((target as Record<string, object>)[key], source[key] as object);
					} else Object.assign(target, { [key]: source[key] });
				}
			}

			return Object.merge(target, ...sources);
		},
		configurable: true,
		writable: true,
	});
}
