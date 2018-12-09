import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EShopRoute } from './eshop.route';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { OrderComponent } from './order/order.component';
import { NewProductComponent } from './home/new-product/new-product.component';
import { MainDetailComponent } from './details/main-detail/main-detail.component';
import { RecommendComponent } from './details/recommend/recommend.component';
import { OrderMainComponent } from './order/order-main/order-main.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { TopSellingComponent } from './home/top-selling/top-selling.component';
import { LeftMenuComponent } from '../shared/left-menu/left-menu.component';
import { CartComponent } from '../shared/cart/cart.component';
import { ShowOderDetailComponent } from './user-info/order-detail/order-detail.component';
import { PageNotFoundComponent } from '../shared/404/pagenotfound.component';
import { MyAccountComponent } from './user-info/my-account/my-account.component';
import { SetPasswordComponent } from './user-info/set-password/set-password.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ErrorPageComponent } from '../shared/error/error-page.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatPaginatorModule, MatSidenavModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        EShopRoute,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatSidenavModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        LeftMenuComponent,
        HomeComponent,
        NewProductComponent,
        TopSellingComponent,
        DetailsComponent,
        MainDetailComponent,
        RecommendComponent,
        OrderComponent,
        OrderMainComponent,
        ShowProductComponent,
        ShowOderDetailComponent,
        CartComponent,
        PageNotFoundComponent,
        MyAccountComponent,
        SetPasswordComponent,
        UserInfoComponent,
        ErrorPageComponent
    ],
    exports: [],
    providers: [],
})
export class EShopModule { }
