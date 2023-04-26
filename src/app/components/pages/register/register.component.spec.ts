/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { CommonComponentsModule } from '../../common/common.module';

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule, FormsModule, ReactiveFormsModule],
			providers: [PageService, TranslateService, UserService, FormBuilder],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterComponent);
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
			component.formGroup.controls['captcha'].markAsTouched(); // left the field without entering anything
			component.formGroup.controls['captcha'].setErrors({ required: true }); // invalid captcha

			Object.keys(component.formGroup.controls['email'].errors ?? {}).forEach((key) => {
				expect(component.getError(key)).toEqual(`global.errors.${key}`);
			});
		});
	});

	describe('register', () => {
		expect(true).toBeTrue(); // TODO: add a test once the API is ready
	});
});
*/
