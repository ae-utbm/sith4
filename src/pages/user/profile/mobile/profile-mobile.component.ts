import type { base64, imageURL } from '#types';
import type { UserPublicDto, UserPrivateDto } from '#types/api';

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-user-profile-mobile',
	templateUrl: './profile-mobile.html',
	styleUrls: ['./profile-mobile.scss'],
})
export class UserProfileMobileComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}

	@Input() public user?: UserPublicDto | UserPrivateDto;
	@Input() public userPicture?: base64 | imageURL;
	@Input() public userBanner?: base64 | imageURL;

	@Input() public userCanEdit = false;
	@Input() public userCanReadPrivate = false;

	@Input() public self = false;

	@Output() public openModal = new EventEmitter<'infos' | 'banner' | 'picture'>();

	public currentTab: 'about' | 'contact' = 'about';

	public banned = true;
	public suspended = true;
}
