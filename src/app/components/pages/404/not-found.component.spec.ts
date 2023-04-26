import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { CommonComponentsModule } from '../../common/common.module';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
	let component: NotFoundComponent;
	let fixture: ComponentFixture<NotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NotFoundComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [PageService, TranslateService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
