import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-side-menu-profile',
	templateUrl: './side_profile.html',
	styleUrls: ['./side_profile.scss'],
})
export class SideMenuProfileComponent {
	@Output() public close = new EventEmitter<void>();

	public constructor(
		@Inject(UserService) public readonly user: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}

	public logout(): void {
		this.close.emit();
		this.user.logout();
	}

	public goto(route: 'profile' | 'payments' | 'pictures'): void {
		this.page.route = `users/${this.user.id}${route === 'profile' ? '' : `/${route}`}`;
		this.close.emit();
	}
}
