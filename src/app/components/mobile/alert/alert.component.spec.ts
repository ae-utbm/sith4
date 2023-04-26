import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileAlertComponent } from './alert.component';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/types';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../../common/common.module';

describe('MobileAlertComponent', () => {
	let component: MobileAlertComponent;
	let fixture: ComponentFixture<MobileAlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MobileAlertComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [AlertService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MobileAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('dismiss', () => {
		it('should call dismiss when the close icon is clicked', () => {
			const alertService = TestBed.inject(AlertService);
			const dismissSpy = spyOn(alertService, 'dismiss');

			const alert: Alert = { id: 'id', message: 'test', type: 'info', title: 'test alert' };
			component.dismiss(alert);

			expect(dismissSpy).toHaveBeenCalledWith(alert, 500);
		});
	});
});
