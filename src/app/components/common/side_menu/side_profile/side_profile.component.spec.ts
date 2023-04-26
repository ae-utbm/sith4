import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { SideMenuProfileComponent } from './side_profile.component';
import { IconsModule } from '../../icons/icons.module';

describe('SideMenuProfileComponent', () => {
	let component: SideMenuProfileComponent;
	let fixture: ComponentFixture<SideMenuProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SideMenuProfileComponent],
			imports: [TranslateModule.forRoot(), IconsModule],
			providers: [PageService, UserService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SideMenuProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	describe('logout', () => {
		it('should call close.emit and u.logout', () => {
			const closeSpy = spyOn(component.close, 'emit');
			const logoutSpy = spyOn(component.u, 'logout');

			component.logout();

			expect(closeSpy).toHaveBeenCalled();
			expect(logoutSpy).toHaveBeenCalled();
		});
	});
});
