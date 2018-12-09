import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { CartService } from 'src/app/core/service/shared/cart.service';
import { common } from 'src/app/constant/common.constant';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent extends BaseComponent {
    @Input() dataListProduct;
    arrayCache = [];
    res = '';

    constructor(private cartService: CartService) {
        super();
    }

    /**
     * Go to detail page
     *
     * @param {*} data
     * @memberof CartComponent
     */
    navigateDetail(data) {
        this.navigator.navigate(`/detail/${data}`);
    }

    /**
     * Add product to cart
     *
     * @param {*} product
     * @param {number} [quantity=1]
     * @returns
     * @memberof CartComponent
     */
    addCart(product, quantity = 1) {
        if (localStorage.getItem('Cart') === null) {
            this.arrayCache.push({ quantity, product });
        } else {
            this.arrayCache = JSON.parse(localStorage.getItem('Cart')) as any[];
            const index = this.arrayCache.findIndex(item => item.product === product);
            if (index === -1) {
                this.arrayCache.push({ quantity, product });
            } else {
                const i = this.dataListProduct.Data.findIndex(item => item.Id === product);
                if ((this.arrayCache[index].quantity + quantity) > this.dataListProduct.Data[i].Quantity) {
                    this.alertService.miniError('Out of stock');
                    return;
                }
                this.arrayCache[index].quantity += quantity;
            }
        }
        this.alertService.miniSuccess(common.add);
        localStorage.setItem('Cart', JSON.stringify(this.arrayCache));
        if (this.isLogin) {
            this.cartService.addToCart(this.userInfo.Id, product).pipe(takeUntil(this.isDestroyed$)).subscribe();
        }
    }
}
