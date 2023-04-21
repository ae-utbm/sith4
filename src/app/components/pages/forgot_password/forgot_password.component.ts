import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot_password.html',
	styleUrls: ['./forgot_password.scss'],
})
export class ForgotPasswordComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
	) {
		t.get('forgot_password.title').subscribe((title) => (p.title = title));
	}
}
