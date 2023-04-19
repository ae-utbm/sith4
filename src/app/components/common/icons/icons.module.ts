import { NgModule } from '@angular/core';
import { IconExpandLessComponent } from './expand_less/expand_less.component';
import { IconExpandMoreComponent } from './expand_more/expand_more.component';
import { IconBurgerMenuComponent } from './burger_menu/burger_menu.component';
import { IconCogwheelComponent } from './cogwheel/cogwheel.component';
import { IconEmptyProfileComponent } from './empty_profile/empty_profile.component';
import { IconHeartPlusComponent } from './heart_plus/heart_plus.component';
import { IconLaundryComponent } from './laundry/laundry.component';
import { IconMessagesComponent } from './messages/messages.component';
import { IconPartyHatComponent } from './party_hat/party_hat.component';
import { IconPicturesComponent } from './pictures/pictures.component';
import { IconSearchComponent } from './search/search.component';
import { IconShoppingBasketComponent } from './shopping_basket/shopping_basket.component';
import { IconShoppingCartComponent } from './shopping_cart/shopping_cart.component';

@NgModule({
	declarations: [
		IconBurgerMenuComponent,
		IconCogwheelComponent,
		IconEmptyProfileComponent,
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
	],
	exports: [
		IconBurgerMenuComponent,
		IconCogwheelComponent,
		IconEmptyProfileComponent,
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
	],
	imports: [],
})
export class IconsModule {}
