import type { base64 } from '#types';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'sith-file-input',
	templateUrl: './file-input.html',
	styleUrls: ['./file-input.scss'],
})
export class FileInputComponent {
	public filename = '';

	@Input() public inputAccept = 'image/*';
	@Output() public fileChange: EventEmitter<base64> = new EventEmitter<base64>();

	public onFileChange(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input && input.files && input.files[0]) {
			const reader = new FileReader();

			reader.onload = (event: ProgressEvent) => {
				this.fileChange.emit((<FileReader>event.target).result as base64);
			};

			reader.readAsDataURL(input.files[0]);
			this.filename = input.files[0].name;
		}
	}
}
