import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-users',
	templateUrl: './users.html',
	styleUrls: [],
})
export class UsersComponent {
	public users = [{ id: 1, first_name: 'John', last_name: 'Doe', nickname: 'jdoe' }];

	public constructor(@Inject(PageService) public readonly page: PageService) {
		// this.apollo
		// 	.query<{ users: PublicUser[] }>({
		// 		query: gql`
		// 			query {
		// 				users {
		// 					id
		// 					first_name
		// 					last_name
		// 					nickname
		// 				}
		// 			}
		// 		`,
		// 	})
		// 	.subscribe(({ data }) => {
		// 		this.users = data['users'];
		// 	});
	}
}
