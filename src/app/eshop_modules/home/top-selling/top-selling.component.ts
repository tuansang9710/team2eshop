import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { HomeService } from 'src/app/core/service/modules/home.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-top-selling',
    templateUrl: './top-selling.component.html',
    providers: [HomeService]
})
export class TopSellingComponent extends BaseComponent {
    dataTopSelling;

    constructor(private service: HomeService) {
        super();
    }

    /**
     * Get data for top selling
     *
     * @memberof TopSellingComponent
     */
    onInit() {
        this.service.getTopSelling().pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
            if (res.Status) {
                this.dataTopSelling = res;
            }
        });
    }
}
