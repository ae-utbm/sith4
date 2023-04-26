import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommonComponentsModule } from '../../common/common.module';
import { DesktopAlertComponent } from './alert.component';
import { Alert } from 'src/types';

describe('DesktopAlertComponent', () => {
	let component: DesktopAlertComponent;
	let fixture: ComponentFixture<DesktopAlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DesktopAlertComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [AlertService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DesktopAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	describe('dismiss', () => {
		it('should call dismiss when the close icon is clicked', () => {
			const alertService = TestBed.inject(AlertService);
			const dismissSpy = spyOn(alertService, 'dismiss');

			const alert: Alert = { id: 'id', message: 'test', type: 'info', title: 'test alert' };
			component.dismiss(alert);

			expect(dismissSpy).toHaveBeenCalledWith(alert, 400);
		});
	});
});
