import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { HomeService } from 'src/app/core/service/modules/home.service';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    providers: [HomeService]
})
export class NewProductComponent extends BaseComponent {
    dataNewProduct;

    constructor(private service: HomeService) {
        super();
    }

    /**
     * Get data for new product
     *
     * @memberof NewProductComponent
     */
    onInit() {
        this.service.getNewProduct().pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
            if (res.Status) {
                this.dataNewProduct = res;
            }
        });
    }
}
