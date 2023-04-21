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
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
	) {}

	public logout(): void {
		this.close.emit();
		this.u.logout();
	}
}
