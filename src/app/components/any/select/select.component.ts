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
