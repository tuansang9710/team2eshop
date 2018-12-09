import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
    selector: 'app-t2-error-page',
    templateUrl: './error-page.component.html'
})

export class ErrorPageComponent extends BaseComponent {
    params: any;

    constructor(private route: ActivatedRoute) {
        super();
    }

    onInit() {
        // Get params in url
        this.route.params.subscribe(res => {
            this.params = res;
        });
    }

    /**
     * Back to home
     *
     * @memberof ErrorPageComponent
     */
    returnToHome() {
        this.navigator.navigateHomePage();
    }
}
