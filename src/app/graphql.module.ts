import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, APOLLO_FLAGS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

/**
 * Add Middleware to Apollo Client before sending request
 * @param httpLink Apollo HTTP Link
 */
export function createApollo(httpLink: HttpLink) {
	const lang = setContext(() => {
		const locale = localStorage.getItem('locale') ?? 'en-US';

		return {
			headers: {
				'Accept-Language': locale,
			},
		};
	});

	const auth = setContext(() => {
		const token = sessionStorage.getItem('user_token');

		if (token === null) return {};
		return {
			headers: {
				Authorization: token,
			},
		};
	});

	const cache = new InMemoryCache();
	const link = ApolloLink.from([
		lang,
		auth,
		httpLink.create({
			uri: environment.GRAPHQL_URL,
		}),
	]);

	return {
		cache,
		link,
	};
}

@NgModule({
	exports: [HttpClientModule, ApolloModule],
	providers: [
		{
			provide: APOLLO_FLAGS,
			useValue: {
				useMutationLoading: true,
			},
		},
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
