import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-profile-infos-edit-modal',
	templateUrl: './infos-edit-modal.html',
	styleUrls: ['./infos-edit-modal.scss'],
})
export class UserProfileInfosEditModalComponent {
	@ViewChild('modal', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@Input() public username = '';

	private userId = 0;

	public constructor(@Inject(UserService) private readonly user: UserService, private activeRoute: ActivatedRoute) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'], 10);
		});
	}

	public ngOnInit(): void {
		this.modal.nativeElement.addEventListener('click', (e) => {
			const dimensions = this.modal.nativeElement.getBoundingClientRect();
			if (!dimensions) return;

			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			)
				this.close();
		});
	}

	public isSelf() {
		return this.userId === this.user.id;
	}

	public open() {
		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}
}
