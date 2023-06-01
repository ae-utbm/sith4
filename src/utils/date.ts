export {};

declare global {
	interface Date {
		/**
		 * Returns the age of the date in years.
		 * @returns {number} The age of the date in years.
		 * @example
		 * const date = new Date('2000-01-01');
		 * date.asAge(); // 23 (if you're in 2023)
		 */
		getAge(): number;
	}
}

if (!Date.prototype.getAge) {
	Date.prototype.getAge = function () {
		const diff = Date.now() - this.getTime();
		const age = new Date(diff);
		return Math.abs(age.getUTCFullYear() - 1970);
	};
}
