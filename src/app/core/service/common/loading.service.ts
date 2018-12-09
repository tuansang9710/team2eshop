import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private isLoading$ = new Subject<boolean>();

  startLoading() {
    this.isLoading$.next(true);
  }

  stopLoading() {
    this.isLoading$.next();
  }

  getStatusLoading(): Observable<any> {
    return this.isLoading$.asObservable();
  }
}
