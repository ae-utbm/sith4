import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
	@Input() options: ISelectOption[] = [];
	@Input() selectedOption: ISelectOption = {
		label: 'Select an option',
		value: '',
	};
	@Output() optionSelected = new EventEmitter<string>();

	dropdownVisible = false;

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

export interface ISelectOption {
	image?: string;
	label: string;
	value: string;
}
