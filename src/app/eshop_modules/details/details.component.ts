import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base.component';
import { DetailService } from 'src/app/core/service/modules/detail.service';
import { takeUntil } from 'rxjs/operators';
import { ShowProductService } from 'src/app/core/service/modules/show-product.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    providers: [DetailService, ShowProductService]
})
export class DetailsComponent extends BaseComponent {
    dataForDetail;
    dataForRecommend;

    constructor(
        private service: DetailService,
        private route: ActivatedRoute,
        private showProductService: ShowProductService
    ) {
        super();
    }

    /**
     * Get data for Detail
     *
     * @memberof DetailsComponent
     */
    onInit() {
        this.route.params.subscribe(res => {
            this.service.getDetail(res.id).pipe(takeUntil(this.isDestroyed$)).subscribe(response => {
                this.dataForDetail = response.Data;
                const page = Math.floor((Math.random() * 5) + 1);
                this.showProductService.getProByCat(response.Data.IdCategories, page, 3).pipe(takeUntil(this.isDestroyed$)).subscribe(
                    data => {
                        this.dataForRecommend = data.Data;
                    }
                );
            });
        });
    }
}
