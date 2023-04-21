import { Component, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-mobile-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class MobileNavbarComponent {
	public constructor(@Inject(UserService) public readonly u: UserService) {}
}
