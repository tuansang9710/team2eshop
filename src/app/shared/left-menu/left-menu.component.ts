import { Component, EventEmitter, Output } from '@angular/core';
import { LeftMenuService } from '../../core/service/shared/left-menu.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-t2-left-menu',
  templateUrl: './left-menu.component.html',
  providers: [LeftMenuService]
})
export class LeftMenuComponent extends BaseComponent {
  @Output() open: EventEmitter<any> = new EventEmitter();
  dataListCat;
  isCollapsed = false;

  constructor(private service: LeftMenuService) {
    super();
  }

  /**
   * Show data in screen
   *
   * @memberof LeftMenuComponent
   */
  onInit() {
    this.service.getCategories().pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
      if (res.Status) {
        this.dataListCat = res;
      }
    });
  }

  /**
   * Go to product page
   *
   * @param {*} data
   * @memberof LeftMenuComponent
   */
  navigate(data) {
    this.navigator.navigate(`/product/${data}`);
    this.open.emit(data);
  }
}
