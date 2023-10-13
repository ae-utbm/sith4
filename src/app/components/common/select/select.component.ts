import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isRTL } from 'src/utils';

export interface ISelectOption {
	image?: string;
	label: string;
	value: string;
}

@Component({
	selector: 'sith-select',
	templateUrl: './select.html',
	styleUrls: ['./select.scss'],
})
export class SelectComponent {
	public readonly DEFAULT_OPTION: ISelectOption = {
		label: '',
		value: '',
	};

	public dropdownVisible = false;

	/** Options to display in the dropdown */
	@Input() public options: ISelectOption[] = [];
	/** The currently selected option */
	@Input() public selectedOption: ISelectOption = this.DEFAULT_OPTION;
	/** Emit an event with a string being the `value` of the selected option */
	@Output() public optionSelected = new EventEmitter<string>();

	public get isRTL(): boolean {
		return isRTL();
	}
	/**
	 * Displays or hides the dropdown.
	 */
	public toggleDropdown() {
		this.dropdownVisible = !this.dropdownVisible;
	}

	/**
	 * Sort the options by their label.
	 * @returns {ISelectOption[]} the sorted options
	 */
	public sortOptions(): ISelectOption[] {
		return this.options.sort((a, b) => a.label.localeCompare(b.label));
	}

	/**
	 * Selects an option and emits the value of the option.
	 * @param {ISelectOption} option the option to select
	 */
	public selectOption(option: ISelectOption) {
		this.selectedOption = option;
		this.optionSelected.emit(option.value);
		this.toggleDropdown();
	}
}
