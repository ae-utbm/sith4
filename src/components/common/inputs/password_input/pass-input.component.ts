import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'sith-password-input',
	templateUrl: './pass-input.html',
	styleUrls: ['./pass-input.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordInputComponent),
			multi: true,
		},
	],
})
export class PasswordInputComponent implements ControlValueAccessor {
	@Input() public autocomplete: 'on' | 'off' | 'current-password' | 'new-password' = 'off';

	public type: 'password' | 'text' = 'password';

	public toggleVisibility() {
		this.type = this.type === 'password' ? 'text' : 'password';
	}

	// weird type because of 'any' type in ControlValueAccessor methods
	// -> tell me you're using 'any' without telling me you're using 'any'
	public onChange!: Parameters<ControlValueAccessor['registerOnChange']>[0];
	public onTouch!: Parameters<ControlValueAccessor['registerOnTouched']>[0];

	public input: unknown;

	registerOnChange(fn: Parameters<ControlValueAccessor['registerOnChange']>[0]): void {
		this.onChange = fn as unknown;
	}
	registerOnTouched(fn: Parameters<ControlValueAccessor['registerOnTouched']>[0]): void {
		this.onTouch = fn as unknown;
	}

	writeValue(obj: Parameters<ControlValueAccessor['writeValue']>[0]): void {
		this.input = obj;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setDisabledState?(isDisabled: boolean): void {
		return;
	}
}
