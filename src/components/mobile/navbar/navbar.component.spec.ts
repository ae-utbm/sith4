import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

import { MobileNavbarComponent } from './navbar.component';
import { MobileComponentsModule } from '../mobile.module';

describe('MobileNavbarComponent', () => {
	let component: MobileNavbarComponent;
	let fixture: ComponentFixture<MobileNavbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MobileNavbarComponent],
			imports: [TranslateModule.forRoot(), MobileComponentsModule],
			providers: [PageService, UserService],
		}).compileComponents();

		fixture = TestBed.createComponent(MobileNavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
