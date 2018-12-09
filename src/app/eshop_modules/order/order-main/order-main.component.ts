import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { OrderService } from 'src/app/core/service/modules/order.service';
import { ModalService } from 'src/app/core/service/common/modal.service';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { common } from 'src/app/constant/common.constant';
import { CartService } from 'src/app/core/service/shared/cart.service';

@Component({
    selector: 'app-order-main',
    templateUrl: './order-main.component.html',
    providers: [OrderService]
})
export class OrderMainComponent extends BaseComponent {
    loading = false;
    isEmpty = false;
    quantity = [];
    arrayProduct = [];
    listProduct = [];
    arrayCache = [];
    total = 0;

    constructor(private service: OrderService, private cartService: CartService, private modalService: ModalService) {
        super();
    }

    onInit() {
        this.showOrder();
    }

    /**
     * Hading total amount
     *
     * @memberof OrderMainComponent
     */
    handingTotal() {
        this.total = 0;
        let i = 0;
        this.listProduct.forEach(element => {
            this.total += element.Price * this.quantity[i]; // (element.Price * element.PromotionPrice / 100)
            i++;
        });
    }

    /**
     * Init data's list order
     *
     * @memberof OrderMainComponent
     */
    initListOrder() {
        this.quantity = [];
        this.arrayProduct = [];
        this.listProduct = [];
        this.arrayCache = [];
        this.total = 0;
    }

    /**
     * Show data in screen
     *
     * @param {string} [type]
     * @memberof OrderMainComponent
     */
    showOrder(type?: string) {
        this.arrayProduct = JSON.parse(localStorage.getItem('Cart')) || [];
        const params = [];
        this.arrayProduct.forEach(element => {
            params.push(element.product);
            this.quantity.push(element.quantity);
        });
        this.service.getByListProduct(params).pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
            this.listProduct = res.Data;
            this.listProduct.length === 0 ? this.isEmpty = true : this.isEmpty = false;
            if (type !== 'delete') {
                this.handingTotal();
            }
        });
    }

    /**
     * Check out
     *
     * @memberof OrderMainComponent
     */
    btnCheckout() {
        if (!this.isLogin) {
            this.modalService.open(LoginComponent, { type: 'login' }, { centered: true });
        } else {
            this.alertService.questionWithCancel('Are you sure you want to payment?').subscribe(status => {
                if (status.value) {
                    this.loading = true;
                    this.service.getPayment(this.userInfo.Id).pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
                        this.loading = false;
                        if (res.Status) {
                            this.navigator.navigateHomePage();
                            this.alertService.success('Payment Successful!');
                            this.initListOrder();
                            localStorage.removeItem('Cart');
                        } else {
                            this.alertService.error('Payment Error!');
                        }
                    });
                }
            });
        }
    }

    /**
     * Delete product
     *
     * @param {number} idProduct
     * @memberof OrderMainComponent
     */
    btnDelete(idProduct: number) {
        this.arrayCache = JSON.parse(localStorage.getItem('Cart'));
        const index = this.arrayCache.findIndex(item => item.product === idProduct);
        if (this.arrayCache.length === 1) {
            localStorage.removeItem('Cart');
            this.showOrder();
            this.initListOrder();
        } else {
            if (index !== -1) {
                this.total = this.total - (this.listProduct[index].Price * this.quantity[index]);
                // (this.listProduct[index].Price * this.listProduct[index].PromotionPrice / 100)
                this.arrayCache.splice(index, 1);
            }
            localStorage.setItem('Cart', JSON.stringify(this.arrayCache));
            this.showOrder('delete');
            this.alertService.miniSuccess(common.remove);
        }
        if (this.isLogin) {
            this.cartService.addToCartNotLogin(this.userInfo.Id, this.arrayCache).subscribe();
        }
    }

    /**
     * Auto update product in cart
     *
     * @param {*} quantity
     * @param {*} index
     * @memberof OrderMainComponent
     */
    onUpdateQuantity(quantity, index) {
        if (quantity.target.value > this.listProduct[index].Quantity) {
            quantity.target.value = this.listProduct[index].Quantity;
        } else if (quantity.target.value <= 0) {
            quantity.target.value = 1;
        }
        this.arrayCache = JSON.parse(localStorage.getItem('Cart'));
        this.arrayCache[index].quantity = this.quantity[index] = quantity.target.valueAsNumber;
        localStorage.setItem('Cart', JSON.stringify(this.arrayCache));
        if (this.isLogin) {
            this.cartService.addToCartNotLogin(this.userInfo.Id, this.arrayCache).subscribe();
        }
        this.showOrder();
    }

    /**
     * Update product in cart
     *
     * @memberof OrderMainComponent
     */
    btnUpdate() {
        this.showOrder();
        this.alertService.miniSuccess('Update');
    }

    /**
     * Back to home
     *
     * @memberof OrderMainComponent
     */
    btnBack() {
        this.navigator.navigate('');
    }
}
