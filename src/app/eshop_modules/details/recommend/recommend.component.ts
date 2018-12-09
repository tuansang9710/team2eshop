import { Component, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.component.html',
})
export class RecommendComponent extends BaseComponent {
    @Input() dataForRecommend;
}
