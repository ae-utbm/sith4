import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectComponent } from './select.component';
import { IconsModule } from '../icons/icons.module';
import type { SelectComponentOption } from 'src/types';
import { TranslateModule } from '@ngx-translate/core';

describe('SelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;
	let button: DebugElement;
	let dropdown: DebugElement;

	const unsortedOptions: SelectComponentOption[] = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 3', value: '3' },
		{ label: 'Option 2', value: '2' },
	];

	const sortedOptions: SelectComponentOption[] = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
		{ label: 'Option 3', value: '3' },
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectComponent],
			imports: [IconsModule, TranslateModule.forRoot()],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		component.options = unsortedOptions;
		fixture.detectChanges();

		button = fixture.debugElement.query(By.css('.selector'));
		dropdown = fixture.debugElement.query(By.css('.dropdown'));
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle dropdown visibility on button click', () => {
		expect(component.dropdownVisible).toBeFalse();

		button.nativeElement.click();
		fixture.detectChanges();
		expect(component.dropdownVisible).toBeTrue();

		button.nativeElement.click();
		fixture.detectChanges();
		expect(component.dropdownVisible).toBeFalse();
	});

	it('should sort options by label', () => {
		expect(component.sortOptions()).toEqual(sortedOptions);
	});

	it('should select option and emit value', () => {
		const selectedOption = sortedOptions[1];
		const dropdownVisible = component.dropdownVisible;
		spyOn(component.optionSelected, 'emit');
		expect(component.selectedOption).toEqual(component.DEFAULT_OPTION);

		component.selectOption(selectedOption);
		expect(component.selectedOption).toEqual(selectedOption);
		expect(component.optionSelected.emit).toHaveBeenCalledWith(selectedOption.value);
		expect(component.dropdownVisible).toEqual(!dropdownVisible);
	});

	it('should display selected option label and image', () => {
		const selectedOption = sortedOptions[1];
		const selectedOptionWithImage = { ...selectedOption, image: 'assets/flags/en-GB.svg' };

		component.selectedOption = selectedOption;
		fixture.detectChanges();

		const label = fixture.debugElement.query(By.css('.label'));
		let image = fixture.debugElement.query(By.css('.image'));

		expect(label.nativeElement.textContent).toEqual(selectedOption.label);
		expect(image).toBeNull();

		component.selectedOption = selectedOptionWithImage;
		fixture.detectChanges();
		image = fixture.debugElement.query(By.css('.image'));

		expect(label.nativeElement.textContent).toEqual(selectedOptionWithImage.label);
		expect(image.nativeElement.getAttribute('src')).toEqual(selectedOptionWithImage.image);
	});

	it('should display dropdown options and select option on click', () => {
		const selectedOption = sortedOptions[1];
		spyOn(component, 'selectOption');
		expect(component.dropdownVisible).toBeFalse();
		expect(dropdown).toBeNull();

		button.nativeElement.click();
		fixture.detectChanges();

		dropdown = fixture.debugElement.query(By.css('.dropdown'));
		const optionsElements = fixture.debugElement.queryAll(By.css('.item'));

		expect(dropdown).not.toBeNull();
		expect(component.dropdownVisible).toBeTrue();
		expect(optionsElements.length).toEqual(sortedOptions.length);

		optionsElements[1].nativeElement.click();
		fixture.detectChanges();
		dropdown = fixture.debugElement.query(By.css('.dropdown'));

		expect(component.selectOption).toHaveBeenCalledWith(selectedOption);
	});
});
