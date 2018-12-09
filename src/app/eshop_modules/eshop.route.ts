import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { OrderComponent } from './order/order.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { ShowOderDetailComponent } from './user-info/order-detail/order-detail.component';
import { AuthGuard } from '../core/service/guards/auth.guard';
import { UserInfoComponent } from './user-info/user-info.component';
import { SetPasswordComponent } from './user-info/set-password/set-password.component';
import { MyAccountComponent } from './user-info/my-account/my-account.component';
import { ErrorPageComponent } from '../shared/error/error-page.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail/:id', component: DetailsComponent },
    { path: 'product/:id', component: ShowProductComponent },
    { path: 'error/:id', component: ErrorPageComponent },
    { path: 'order', component: OrderComponent },
    { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
    { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },
    { path: 'orderdetail', component: ShowOderDetailComponent, canActivate: [AuthGuard] },
    { path: 'set-password', component: SetPasswordComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'error/notfound', pathMatch: 'full' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class EShopRoute { }
