import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtitleComponent } from './subtitle.component';

describe('MobileSubtitleComponent', () => {
	let component: SubtitleComponent;
	let fixture: ComponentFixture<SubtitleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SubtitleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SubtitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should render text', () => {
		const text = 'Hello World';
		component.text = text;
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('h2');
		expect(element.textContent.trim()).toBe(text);
	});

	it('should add bordered class when bordered input is true', () => {
		component.bordered = true;
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('h2');
		expect(element.classList.contains('bordered')).toBe(true);
	});

	it('should add dark-mode class when onDarkBackground input is true', () => {
		component.onDarkBackground = true;
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('h2');
		expect(element.classList.contains('dark-mode')).toBe(true);
	});
});
