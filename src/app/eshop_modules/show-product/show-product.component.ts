import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'src/app/core/base/base.component';
import { ShowProductService } from 'src/app/core/service/modules/show-product.service';

@Component({
    selector: 'app-show-product',
    templateUrl: './show-product.component.html',
    providers: [ShowProductService]
})
export class ShowProductComponent extends BaseComponent {
    isLoadMore = true;
    dataListProduct;
    newDataListProduct;
    params;
    numPage = 1;
    isError = false;

    constructor(private service: ShowProductService, private route: ActivatedRoute) {
        super();
    }

    /**
     * Init data for check button Load More
     *
     * @memberof ShowProductComponent
     */
    initLoadMore() {
        this.isLoadMore = true;
        this.numPage = 1;
    }

    /**
     * Show data in screen
     *
     * @param {number} [catID]
     * @memberof ShowProductComponent
     */
    onInit(catID?: number) {
        this.initLoadMore();
        if (!isNaN(catID)) {
            this.params = catID;
        } else {
            this.route.params.pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
                this.params = res.id;
            });
        }
        this.service.getProByCat(this.params, this.numPage).subscribe(res => {
            if (res.Status) {
                res.Data.length === 0 ? this.isError = true : this.isError = false;
                this.dataListProduct = res;
                if (this.dataListProduct.Data.length < 6) {
                    this.isLoadMore = false;
                }
            }
        });
    }

    /**
     * Handing event input
     *
     * @param {number} catID
     * @memberof ShowProductComponent
     */
    onOpen(catID: number) {
        this.onInit(catID);
    }

    /**
     * Handing button load more
     *
     * @memberof ShowProductComponent
     */
    btnLoadMoreProduct() {
        this.numPage++;
        this.service.getProByCat(this.params, this.numPage).subscribe(res => {
            if (res) {
                this.newDataListProduct = res.Data;
                if (this.newDataListProduct.length < 6) {
                    this.isLoadMore = false;
                }
                this.newDataListProduct.forEach(element => {
                    this.dataListProduct.Data.push(element);
                });
            }
        });
    }
}
