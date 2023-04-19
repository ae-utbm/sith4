import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-desktop-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class DesktopNavbarComponent {
	public constructor(@Inject(TranslateService) public readonly translate: TranslateService) {}
}
