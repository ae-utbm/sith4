import { Component, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-side-menu-options',
	templateUrl: './side_options.html',
	styleUrls: ['./side_options.scss'],
})
export class SideMenuOptionsComponent {
	public constructor(@Inject(UserService) public readonly u: UserService) {}
}
