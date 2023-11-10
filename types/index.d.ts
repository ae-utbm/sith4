import { base64 } from '#types';

export * from './i18n';
export * from './a10y';

export interface ImageCropperSetting {
	width: number;
	height: number;
}

export interface ImageCropperResult {
	imageData: Cropper.ImageData;
	cropData: Cropper.CropBoxData;
	blob?: Blob;
	dataUrl?: base64;
}
