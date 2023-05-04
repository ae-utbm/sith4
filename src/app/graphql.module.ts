import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

export function createApollo(httpLink: HttpLink) {
	const auth = setContext(async () => {
		const token = localStorage.getItem('token');
		const locale = localStorage.getItem('locale') ?? 'en-US';

		if (token === null) {
			return {
				headers: {
					'Accept-Language': locale,
				},
			};
		} else {
			return {
				headers: {
					Authorization: token,
					'Accept-Language': locale,
				},
			};
		}
	});

	const link = ApolloLink.from([auth, httpLink.create({ uri: environment.API_URL })]);
	const cache = new InMemoryCache();

	return {
		link,
		cache,
	};
}

@NgModule({
	exports: [HttpClientModule, ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
