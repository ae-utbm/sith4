import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, getErrors } from 'src/app/directives';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'sith-forgot-password',
	templateUrl: './forgot_password.html',
	styleUrls: ['./forgot_password.scss'],
})
export class ForgotPasswordComponent {
	public formGroup: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email, CustomValidators.forbiddenEmailValidator('@utbm.fr')]],
	});

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
	) {
		t.get('forgot_password.title').subscribe((title) => (page.title = title));
	}

	public errors(field: string): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}

	public sendEmail(): void {
		return;
	}
}
