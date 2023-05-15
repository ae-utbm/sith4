import { Component, Inject, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Objected, PromotionObject } from 'src/types/objects';

@Component({
	selector: 'icon-promotion',
	templateUrl: './promo_icon.html',
	styleUrls: ['../icons.scss', './promo_icon.scss'],
})
export class IconPromotionComponent {
	public picture?: string = undefined;

	@Input() public number?: number = undefined;

	public constructor(@Inject(Apollo) private readonly apollo: Apollo) {
		this.apollo
			.query<Objected<PromotionObject>>({
				query: gql`
					query ($number: Int!) {
						promotion(number: $number) {
							picture
						}
					}
				`,
				variables: {
					number: this.number,
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				if (!data) return;
				this.picture = data['promotion']?.picture;
			});
	}
}
