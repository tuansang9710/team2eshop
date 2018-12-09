import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { DetailService } from 'src/app/core/service/modules/detail.service';
import { common } from 'src/app/constant/common.constant';
import { CartService } from 'src/app/core/service/shared/cart.service';

@Component({
    selector: 'app-main-detail',
    templateUrl: './main-detail.component.html',
    providers: [DetailService]
})
export class MainDetailComponent extends BaseComponent {
    @Input() dataForDetail;
    arrayCache = [];

    constructor(private cartService: CartService) {
        super();
    }

    /**
     * Return home page
     *
     * @memberof MainDetailComponent
     */
    returnPage() {
        this.navigator.navigateHomePage();
    }

    /**
     * Add product to card
     *
     * @param {*} product
     * @param {number} [quantity=1]
     * @returns
     * @memberof MainDetailComponent
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
                if (this.arrayCache[index].quantity + quantity > this.dataForDetail.Quantity) {
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

    /**
     * Check quantity product
     *
     * @param {*} quantity Input quantity of product
     * @memberof MainDetailComponent
     */
    onUpdateQuantity(quantity) {
        let quantityInCache = 0;
        if (localStorage.getItem('Cart')) {
            this.arrayCache = JSON.parse(localStorage.getItem('Cart')) as any[];
            const index = this.arrayCache.findIndex(item => item.product === this.dataForDetail.Id);
            quantityInCache = this.arrayCache[index].quantity;
        }
        if (quantity.target.value > this.dataForDetail.Quantity - quantityInCache) {
            quantity.target.value = this.dataForDetail.Quantity - quantityInCache;
        } else if (quantity.target.value <= 0) {
            quantity.target.value = 1;
        }
    }
}
