import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LangSelectorComponent } from './lang_selector.component';
import { PageService } from 'src/app/services/page.service';
import { CommonComponentsModule } from '../common.module';

describe('MobileLangSelectorComponent', () => {
	let component: LangSelectorComponent;
	let fixture: ComponentFixture<LangSelectorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LangSelectorComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [PageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LangSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should return the default language when no language is set', () => {
		spyOnProperty(component.p, 'lang', 'get').and.returnValue('anything');
		expect(component.selection).toEqual({
			label: 'English',
			value: 'en-US',
			image: 'assets/flags/en-GB.svg',
		});
	});
});
