import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DEFAULT_HEADERS } from 'src/utils/http';

@Component({
	selector: 'icon-promotion',
	templateUrl: './promo_icon.html',
	styleUrls: ['../icons.scss', './promo_icon.scss'],
})
export class IconPromotionComponent implements OnInit {
	public picture?: string = undefined;

	@Input() public number?: number;
	@Input() public id?: number;

	public constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

	public ngOnInit(): void {
		this.http
			.get(`${environment.API_URL}/promotions/logo/${this.id}`, {
				headers: DEFAULT_HEADERS,
				responseType: 'arraybuffer',
			})
			.subscribe({
				next: (data) => {
					this.picture = data.toBase64();
				},
				error: () => {
					this.picture = undefined;
				},
			});
	}
}
