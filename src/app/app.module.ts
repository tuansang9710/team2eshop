import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'hammerjs';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoute } from './app.route';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { JwtInterceptor } from 'src/app/core/service/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/core/service/helpers/error.interceptor';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './shared/login/login.component';

import { ModalService } from './core/service/common/modal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatFormFieldModule,
} from '@angular/material';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SweetAlert2Module.forRoot(),
        NgbModule.forRoot(),
        AppRoute,
        LoadingBarRouterModule,
        LoadingBarHttpClientModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        ScrollingModule,
    ],

    declarations: [
        AppComponent, HeaderComponent, FooterComponent, LoginComponent
    ],
    providers: [
        ModalService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    entryComponents: [LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
