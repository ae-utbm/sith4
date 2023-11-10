import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

import { LoginComponent } from './login.component';
import { CommonComponentsModule } from '../../components/common/common.module';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule, FormsModule, ReactiveFormsModule],
			providers: [TranslateService, PageService, UserService, FormBuilder],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
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

	describe('login', () => {
		it('should login', () => {
			component.formGroup.controls['email'].setValue('exemple@domain.com');
			component.formGroup.controls['password'].setValue('password');
			component.login();
			expect(true).toBeTrue(); // TODO: add a test once the API is ready
		});
	});
});
