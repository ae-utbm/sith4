import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterComponent {
	public constructor(@Inject(PageService) public readonly p: PageService) {}
}
