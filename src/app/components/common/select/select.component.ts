import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ISelectOption {
	image?: string;
	label: string;
	value: string;
}

@Component({
	selector: 'app-select',
	templateUrl: './select.html',
	styleUrls: ['./select.scss'],
})
export class SelectComponent {
	private readonly DEFAULT_OPTION: ISelectOption = {
		label: '',
		value: '',
	};

	dropdownVisible = false;

	/** Options to display in the dropdown */
	@Input() options: ISelectOption[] = [];
	/** The currently selected option */
	@Input() selectedOption: ISelectOption = this.DEFAULT_OPTION;
	/** Emit an event with a string being the `value` of the selected option */
	@Output() optionSelected = new EventEmitter<string>();

	/**
	 * Displays or hides the dropdown.
	 */
	toggleDropdown() {
		this.dropdownVisible = !this.dropdownVisible;
	}

	/**
	 * Sort the options by their label.
	 * @returns {ISelectOption[]} the sorted options
	 */
	sortOptions(): ISelectOption[] {
		return this.options.sort((a, b) => a.label.localeCompare(b.label));
	}

	/**
	 * Selects an option and emits the value of the option.
	 * @param {ISelectOption} option the option to select
	 */
	selectOption(option: ISelectOption) {
		this.selectedOption = option;
		this.optionSelected.emit(option.value);
		this.toggleDropdown();
	}
}
