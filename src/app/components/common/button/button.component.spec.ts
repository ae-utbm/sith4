import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;
	let button: HTMLButtonElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
	});

	beforeEach(() => {
		button = fixture.debugElement.query(By.css('button')).nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the text passed in through the text input', () => {
		const buttonText = 'Click me!';
		component.text = buttonText;
		fixture.detectChanges();
		expect(button.textContent?.trim()).toBe(buttonText);
	});

	it('should have the appropriate class based on the height input', () => {
		component.height = 'small';
		fixture.detectChanges();
		expect(button.classList).toContain('small');
		component.height = 'medium';
		fixture.detectChanges();
		expect(button.classList).not.toContain('small');
		expect(button.classList).not.toContain('large');
		component.height = 'large';
		fixture.detectChanges();
		expect(button.classList).toContain('large');
	});

	it('should disable the button when the disabled input is true', () => {
		component.disabled = true;
		fixture.detectChanges();
		expect(button.disabled).toBeTrue();
		component.disabled = false;
		fixture.detectChanges();
		expect(button.disabled).toBeFalse();
	});
});
