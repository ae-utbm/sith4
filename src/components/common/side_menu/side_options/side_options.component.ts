import { Component, Inject } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-side-menu-options',
	templateUrl: './side_options.html',
	styleUrls: ['./side_options.scss'],
})
export class SideMenuOptionsComponent {
	public constructor(@Inject(UserService) public readonly u: UserService) {}
}
