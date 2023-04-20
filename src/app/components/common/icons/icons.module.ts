import { NgModule } from '@angular/core';
import { IconExpandLessComponent } from './expand_less/expand_less.component';
import { IconExpandMoreComponent } from './expand_more/expand_more.component';
import { IconBurgerMenuComponent } from './burger_menu/burger_menu.component';
import { IconCogwheelComponent } from './cogwheel/cogwheel.component';
import { IconUserIconComponent } from './user_icon/user_icon.component';
import { IconHeartPlusComponent } from './heart_plus/heart_plus.component';
import { IconLaundryComponent } from './laundry/laundry.component';
import { IconMessagesComponent } from './messages/messages.component';
import { IconPartyHatComponent } from './party_hat/party_hat.component';
import { IconPicturesComponent } from './pictures/pictures.component';
import { IconSearchComponent } from './search/search.component';
import { IconShoppingBasketComponent } from './shopping_basket/shopping_basket.component';
import { IconShoppingCartComponent } from './shopping_cart/shopping_cart.component';
import { CommonModule } from '@angular/common';
import { IconPersonComponent } from './person/person.component';
import { IconPaymentsComponent } from './payments/payments.component';
import { IconAtComponent } from './at/at.component';
import { IconPasswordComponent } from './password/password.component';

@NgModule({
	declarations: [
		IconBurgerMenuComponent,
		IconCogwheelComponent,
		IconUserIconComponent,
		IconExpandLessComponent,
		IconExpandMoreComponent,
		IconHeartPlusComponent,
		IconLaundryComponent,
		IconMessagesComponent,
		IconPartyHatComponent,
		IconPicturesComponent,
		IconSearchComponent,
		IconShoppingBasketComponent,
		IconShoppingCartComponent,
		IconPersonComponent,
		IconPaymentsComponent,
		IconAtComponent,
		IconPasswordComponent,
	],
	exports: [
		IconBurgerMenuComponent,
		IconCogwheelComponent,
		IconUserIconComponent,
		IconExpandLessComponent,
		IconExpandMoreComponent,
		IconHeartPlusComponent,
		IconLaundryComponent,
		IconMessagesComponent,
		IconPartyHatComponent,
		IconPicturesComponent,
		IconSearchComponent,
		IconShoppingBasketComponent,
		IconShoppingCartComponent,
		IconPersonComponent,
		IconPaymentsComponent,
		IconAtComponent,
		IconPasswordComponent,
	],
	imports: [CommonModule],
})
export class IconsModule {}
