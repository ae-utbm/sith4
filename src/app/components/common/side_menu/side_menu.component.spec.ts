import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageService } from 'src/app/services/page.service';
import { SideMenuComponent } from './side_menu.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SideMenuComponent', () => {
	let component: SideMenuComponent;
	let fixture: ComponentFixture<SideMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SideMenuComponent],
			imports: [TranslateModule.forRoot()],
			providers: [PageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SideMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	describe('triggerClose', () => {
		it('should set closing to true then false after 500ms', (done) => {
			component.triggerClose();
			expect(component.closing).toBeTrue();

			setTimeout(() => {
				expect(component.closing).toBeFalse();
				done();
			}, 500);
		});
	});
});
