import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [TranslateModule.forRoot()],
			providers: [TranslateService, PageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
