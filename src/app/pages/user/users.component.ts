import { Component, Inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { PageService } from 'src/app/services/page.service';
import { PublicUser } from 'src/types/objects';

@Component({
	selector: 'sith-users',
	templateUrl: './users.html',
	styleUrls: [],
})
export class UsersComponent {
	public users: PublicUser[] = [];

	public constructor(
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(PageService) public readonly page: PageService,
	) {
		this.apollo
			.query<{ users: PublicUser[] }>({
				query: gql`
					query {
						users {
							id
							first_name
							last_name
							nickname
						}
					}
				`,
			})
			.subscribe(({ data }) => {
				this.users = data['users'];
			});
	}

	public goto(id: number) {
		this.page.route = `/users/${id}`;
	}
}
