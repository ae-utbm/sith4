import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';

// import { Promotion } from '@__old/types/objects';
import { environment } from '@environments/environment';
import { DEFAULT_HEADERS } from '@utils/http';

@Component({
	selector: 'sith-icon-promotion',
	templateUrl: './promo_icon.html',
	styleUrls: ['../icons.scss', './promo_icon.scss'],
})
export class IconPromotionComponent implements OnInit, OnChanges {
	public picture?: string = undefined;

	@Input() public number?: number;
	public id?: number;

	public constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

	public ngOnChanges(): void {
		this.setup();
	}

	public ngOnInit(): void {
		this.setup();
	}

	public setup() {
		if (!this.number) return;
		this.id = undefined;

		// this.apollo
		// 	.query<{ promotion: Promotion }>({
		// 		query: gql`
		// 			query ($number: Int!) {
		// 				promotion(number: $number) {
		// 					id
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			number: this.number,
		// 		},
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, error }) => {
		// 		if (!data || error) return;
		// 		this.id = data['promotion'].id;

		// 		this.getPromoPicture();
		// 	});
	}

	public getPromoPicture() {
		// this.http
		// 	.get(`${environment.API_URL}/promotions/logo/${this.id}`, {
		// 		headers: DEFAULT_HEADERS,
		// 		responseType: 'arraybuffer',
		// 	})
		// 	.subscribe({
		// 		next: (data) => {
		// 			this.picture = data.toBase64();
		// 		},
		// 		error: () => {
		// 			this.picture = undefined;
		// 		},
		// 	});
	}
}
