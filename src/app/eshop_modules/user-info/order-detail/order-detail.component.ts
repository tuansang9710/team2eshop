import { Component, OnInit } from '@angular/core';

import { BaseComponent } from 'src/app/core/base/base.component';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { OrderDetail } from './order-detail.modal';
import { UserInfoService } from 'src/app/core/service/modules/user-info.service';

@Component({
    selector: 'app-show-order-detail',
    templateUrl: './order-detail.component.html',
    providers: [UserInfoService]
})
export class ShowOderDetailComponent extends BaseComponent {
    ListOrderDetail: OrderDetail[] = new Array<OrderDetail>();
    panelOpenState = false;
    pageSize = 10;
    page = 1;
    total = 0;

    constructor(private userInfoService: UserInfoService) {
        super();
    }

    onInit() {
        this.getPurchaseHistory();
    }

    /**
     * Go to detail page
     *
     * @param {*} data
     * @memberof ShowOderDetailComponent
     */
    navigateDetail(data) {
        this.navigator.navigate(`/detail/${data}`);
    }

    /**
     * Get data and show in screen
     *
     * @memberof ShowOderDetailComponent
     */
    getPurchaseHistory() {
        this.userInfoService.purchaseHistory(this.userInfo.Id, this.page, this.pageSize).pipe(filter(x => !!x), tap(orderDetail => {
            if (orderDetail.Status) {
                this.ListOrderDetail = orderDetail.Data.ListOrder;
                this.total = orderDetail.Data.TotalItems;
            } else {
                this.alertService.error(orderDetail.Message);
            }
        })).subscribe();
    }

    /**
     * Handing paging
     *
     * @param {*} event page
     * @memberof ShowOderDetailComponent
     */
    handingPage(event) {
        this.page = event.pageIndex + 1;
        this.getPurchaseHistory();
    }

    /**
     * Change status
     *
     * @param {*} idOrder
     * @memberof ShowOderDetailComponent
     */
    changeStatus(idOrder) {
        this.userInfoService.changeStatus(idOrder).pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
            if (res.Status) {
                this.alertService.miniSuccess('Update Order');
                this.getPurchaseHistory();
            } else {
                this.alertService.miniError('Update Order');
            }
        });
    }
}
