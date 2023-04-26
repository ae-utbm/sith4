import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarComponent } from './navbar.component';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { MobileComponentsModule } from '../mobile.module';
import { TranslateModule } from '@ngx-translate/core';

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
