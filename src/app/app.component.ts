import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HeaderService } from 'src/app/core/service/shared/header.service';
import { Router } from '@angular/router';
import { BaseComponent } from './core/base/base.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [HeaderService]
})

export class AppComponent extends BaseComponent {
    title = 'app';
    breadcrumbList: any;
    name: string;
    menu: Array<any> = [];

    constructor(public loader: LoadingBarService, private headerService: HeaderService, private _router: Router) {
        super();
    }

    onInit() {
        this.menu = this.headerService.getMenu();
        this.listenRouting();
    }

    /**
     * Move on top
     *
     * @memberof AppComponent
     */
    onTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    /**
     * Handing breadcrumb
     *
     * @memberof AppComponent
     */
    listenRouting() {
        let routerUrl: string, routerItem: any, target: any;
        this._router.events.subscribe((router: any) => {
            routerUrl = router.urlAfterRedirects;
            if (routerUrl && typeof routerUrl === 'string') {
                target = this.menu;
                routerItem = routerUrl.slice(1).split('/')[0];
                // tslint:disable-next-line:no-shadowed-variable
                target = target.find(page => page.path.indexOf(routerItem) !== -1);
                if (target) {
                    const nameSplit = target.name.split('/');
                    this.breadcrumbList = {
                        name: nameSplit,
                        path: target.path
                    };
                }
            }
        });
    }
}
