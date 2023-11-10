import type { base64 } from '#types';
import type { ImageCropperResult, ImageCropperSetting } from 'types';

import {
	Component,
	OnDestroy,
	ViewEncapsulation,
	ElementRef,
	ViewChild,
	Input,
	EventEmitter,
	Output,
} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
	selector: 'sith-image-cropper',
	templateUrl: './image-cropper.html',
	styleUrls: ['./image-cropper.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ImageCropperComponent implements OnDestroy {
	@ViewChild('image') public image!: ElementRef;

	@Input() public imageUrl?: string;
	@Input() public settings?: ImageCropperSetting;
	@Input() public cropbox?: Cropper.CropBoxData;
	@Input() public loadImageErrorText?: string;
	@Input() public cropperOptions?: Cropper.Options = {};

	@Output() public export = new EventEmitter<ImageCropperResult>();
	@Output() public ready = new EventEmitter();

	public isLoading = true;
	public cropper?: Cropper;
	public imageElement?: HTMLImageElement;
	public loadError?: boolean = false;

	public ngOnDestroy() {
		if (this.cropper) {
			this.cropper.destroy();
			this.cropper = undefined;
		}
	}

	public imageLoaded(ev: Event) {
		this.loadError = false;

		// Setup image element
		const image = ev.target as HTMLImageElement;
		this.imageElement = image;

		// Add crossOrigin?
		if (this.cropperOptions?.checkCrossOrigin) image.crossOrigin = 'anonymous';

		// Image on ready event
		image.addEventListener('ready', () => {
			// Emit ready
			this.ready.emit(true);

			// Unset loading state
			this.isLoading = false;

			// Validate cropbox existence
			if (this.cropbox && this.cropper) this.cropper.setCropBoxData(this.cropbox);
		});

		// Setup aspect ratio according to settings
		let aspectRatio = NaN;
		if (this.settings) {
			const { width, height } = this.settings;
			aspectRatio = width / height;
		}

		// Set crop options
		// extend default with custom config
		this.cropperOptions = Object.merge(
			{
				aspectRatio,
				movable: false,
				scalable: false,
				zoomable: false,
				viewMode: 1,
				checkCrossOrigin: true,
			},
			{
				...this.cropperOptions,
			},
		);

		// Set cropperjs
		if (this.cropper) {
			this.cropper.destroy();
			this.cropper = undefined;
		}

		this.cropper = new Cropper(image, this.cropperOptions);
	}

	public imageLoadError() {
		this.loadError = true;
		this.isLoading = false;
	}

	public async exportCanvas() {
		if (!this.cropper) return;

		// Get and set image, crop and canvas data
		const imageData = this.cropper.getImageData();
		const cropData = this.cropper.getCropBoxData();
		const canvas = this.cropper.getCroppedCanvas();
		const data = { imageData, cropData };

		// Create promise to resolve canvas data
		const promise = new Promise<Partial<ImageCropperResult>>((resolve) => {
			// Validate base64 and resolve promise with dataUrl
			return resolve({ dataUrl: canvas.toDataURL('image/png') as base64 });
		});

		// Emit export data when promise is ready
		await promise.then((res) => {
			this.export.emit(Object.merge(data, res));
		});
	}
}
