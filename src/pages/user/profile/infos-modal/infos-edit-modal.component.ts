import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomValidators } from '@directives';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-user-profile-infos-edit-modal',
	templateUrl: './infos-edit-modal.html',
	styleUrls: ['./infos-edit-modal.scss'],
})
export class UserProfileInfosEditModalComponent implements OnInit {
	@ViewChild('modal', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@Input() public username = '';

	private userId = 0;

	public readonly infosForm: FormGroup = this.fb.group({
		last_name: [null, [Validators.required, Validators.minLength(2), CustomValidators.nameValidator]],
		first_name: [null, [Validators.required, Validators.minLength(2), CustomValidators.nameValidator]],
		nickname: [null, []],
		email: [null, [Validators.required, Validators.email, CustomValidators.forbiddenEmailValidator('@utbm.fr')]],
		birthday: [
			null,
			[
				Validators.required,
				CustomValidators.ageMinValidator,
				CustomValidators.ageMaxValidator,
				CustomValidators.notInFutureValidator,
			],
		],
		parent_contact: [
			null,
			// [CustomValidators.requiredIfBelow(18, this.user.birthday ? this.user.birthday.getAge() : 0)],
		],
		secondary_email: [null, [Validators.email]],
		phone: [null, []],
		gender: [null, []],
		pronouns: [null, []],
		cursus: [null, []],
		specialty: [null, []],
		promotion: [null, []],
	});

	public visibility: { [key: string]: boolean } = {};

	public minPromotion = 1;
	public maxPromotion = -1;

	public constructor(
		@Inject(FormBuilder) private readonly fb: FormBuilder,
		@Inject(UserService) public readonly user: UserService,
		@Inject(ActivatedRoute) private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'] as string, 10); // FIXME params['id'] might be undefined
			this.fetchUserData();
			this.fetchUserVisibility();

			if (this.isSelf()) {
				this.infosForm.get('first_name')?.disable();
				this.infosForm.get('last_name')?.disable();
				this.infosForm.get('birthday')?.disable();
			}
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

		this.fetchLastPromotion();
	}

	public fetchUserData() {
		// this.apollo
		// 	.query<{ userPrivate: PrivateUser }>({
		// 		query: gql`
		// 			query ($user_id: Int!) {
		// 				userPrivate(id: $user_id) {
		// 					first_name
		// 					last_name
		// 					nickname
		// 					birthday
		// 					email
		// 					secondary_email
		// 					phone
		// 					gender
		// 					pronouns
		// 					cursus
		// 					specialty
		// 					promotion {
		// 						number
		// 					}
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			user_id: this.userId,
		// 		},
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, error }) => {
		// 		if (!data || error) return;

		// 		this.infosForm.patchValue({
		// 			...data.userPrivate,
		// 			birthday: data.userPrivate.birthday.toString().split('T')[0],
		// 			promotion: data.userPrivate.promotion?.number,
		// 		});
		// 	});
	}

	public fetchUserVisibility() {
		// this.apollo
		// 	.query<{ userVisibility: UserVisibility }>({
		// 		query: gql`
		// 			query ($user_id: Int!) {
		// 				userVisibility(id: $user_id) {
		// 					birthday
		// 					cursus
		// 					email
		// 					gender
		// 					parent_contact
		// 					phone
		// 					promotion
		// 					pronouns
		// 					secondary_email
		// 					specialty
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			user_id: this.userId,
		// 		},
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, errors }) => {
		// 		if (!data || errors) return;
		// 		Object.merge(this.visibility, data.userVisibility);
		// 	});
	}

	public fetchLastPromotion() {
		// this.apollo
		// 	.query<{ latestPromotion: Promotion }>({
		// 		query: gql`
		// 			query {
		// 				latestPromotion {
		// 					number
		// 				}
		// 			}
		// 		`,
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, error }) => {
		// 		if (!data || error) return;

		// 		this.maxPromotion = data['latestPromotion'].number;
		// 	});
	}

	public updatePromotion(event: Event) {
		const value = parseInt((event.target as HTMLInputElement).value, 10);
		if (value < this.minPromotion) this.infosForm.controls['promotion'].setValue(this.minPromotion);
		if (value > this.maxPromotion) this.infosForm.controls['promotion'].setValue(this.maxPromotion);
	}

	public get promotion(): number {
		return this.infosForm.get('promotion')?.value as number;
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

	/**
	 * Cancel the changes and close the modal
	 */
	public cancel() {
		this.fetchUserData();
		this.fetchUserVisibility();
		this.close();
	}
}
