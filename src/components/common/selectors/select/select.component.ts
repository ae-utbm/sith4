import type { SelectComponentOption } from 'types';

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-select',
	templateUrl: './select.html',
	styleUrls: ['./select.scss'],
})
export class SelectComponent {
	public readonly DEFAULT_OPTION: SelectComponentOption = {
		label: '',
		value: '',
	};

	public dropdownVisible = false;

	/** Options to display in the dropdown */
	@Input() public options: SelectComponentOption[] = [];
	/** The currently selected option */
	@Input() public selectedOption: SelectComponentOption = this.DEFAULT_OPTION;
	/** Emit an event with a string being the `value` of the selected option */
	@Output() public optionSelected = new EventEmitter<string>();

	public constructor(@Inject(PageService) public readonly page: PageService) {}

	/**
	 * Displays or hides the dropdown.
	 */
	public toggleDropdown() {
		this.dropdownVisible = !this.dropdownVisible;
	}

	/**
	 * Sort the options by their label.
	 * @returns {SelectComponentOption[]} the sorted options
	 */
	public sortOptions(): SelectComponentOption[] {
		return this.options.sort((a, b) => a.label.localeCompare(b.label));
	}

	/**
	 * Selects an option and emits the value of the option.
	 * @param {SelectComponentOption} option the option to select
	 */
	public selectOption(option: SelectComponentOption) {
		this.selectedOption = option;
		this.optionSelected.emit(option.value);
		this.toggleDropdown();
	}
}
