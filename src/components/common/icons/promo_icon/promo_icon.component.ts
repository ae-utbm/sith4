import type { imageURL } from '#types';

import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';

import { PromotionService } from '@services/promotion.service';

@Component({
	selector: 'sith-icon-promotion',
	templateUrl: './promo_icon.html',
	styleUrls: ['../icons.scss', './promo_icon.scss'],
})
export class IconPromotionComponent implements OnInit, OnChanges {
	public constructor(@Inject(PromotionService) private readonly promotionService: PromotionService) {}

	@Input() public number?: number;

	public picture?: imageURL;

	public ngOnChanges(): void {
		this.setup();
	}

	public ngOnInit(): void {
		this.setup();
	}

	public setup() {
		if (!this.number) return;

		this.promotionService.promotionPicture(this.number).subscribe({
			next: (data) => {
				this.picture = data;
			},
			error: (err) => console.error(err),
		});
	}
}
