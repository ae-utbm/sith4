import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { CommonComponentsModule } from '../../common/common.module';
import { ForgotPasswordComponent } from './forgot_password.component';

describe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ForgotPasswordComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule, FormsModule, ReactiveFormsModule],
			providers: [PageService, TranslateService, UserService, FormBuilder],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getError', () => {
		it('should return the error message', () => {
			component.formGroup.controls['email'].markAsTouched(); // left the field without entering anything
			component.formGroup.controls['email'].setErrors({ email: true }); // invalid email

			Object.keys(component.formGroup.controls['email'].errors ?? {}).forEach((key) => {
				expect(component.getError(key)).toEqual(`global.errors.${key}`);
			});
		});
	});

	describe('sendEmail', () => {
		it('should send the email', () => {
			component.formGroup.controls['email'].setValue('exemple@domaine.net');
			component.sendEmail();
			expect(true).toBeTrue(); // TODO: add a test once the API is ready
		});
	});
});
