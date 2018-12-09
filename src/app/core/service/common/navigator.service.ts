import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class T2NavigatorService {

  private transitionParams = new Map<string, any>();

  constructor(private location: Location, public router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Request open a page in a new tab.
   * @param urlLink The page request
   * @param options is an optional string containing a comma-separated list of requested features of the new window
   *
   * Example:
   * var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=yes,height=700,width=700";
   * this.jpNavigatorService.openInNewTab('samples/navigator', strWindowFeatures);
   *
   */
  openInNewTab(urlLink: string, options?: string) {
    return window.open(this.location.prepareExternalUrl(urlLink), '', options);
  }

  /**
   * Open external url
   * Do not use this for internal url
   * @param url
   */
  openExternalUrl(url) {
    return (window.location.href = url);
  }

  /**
   * Open route in new window
   *
   * @param {string} path
   * @param {number} width
   * @param {number} height
   * @param {string} features
   * @memberof JpNavigatorService
   */
  openNewWindow(path: string, width: number, height: number, features: string) {
    let win = null;
    let winl = (screen.width - width) / 2;
    let wint = (screen.height - height) / 2;
    if (winl < 0) { winl = 0; }
    if (wint < 0) { wint = 0; }
    let settings = 'height=' + height + ',';
    settings += 'width=' + width + ',';
    settings += 'top=' + wint + ',';
    settings += 'left=' + winl + ',';
    settings += features;
    win = window.open(path, '', settings);
    win.moveTo(winl, wint);
    win.window.focus();
  }

  /**
   * Close current tab.
   */
  closeTab() {
    return window.close();
  }

  /**
   * Return to home screen.
   */
  navigateHomePage() {
    return this.router.navigate(['']);
  }

  /**
   * Return to login screen.
   */
  navigateLoginPage() {
    return this.router.navigate(['login']);
  }

  /**
   * Return to error screen.
   */
  navigateErrorPage() {
    return this.router.navigate(['error']);
  }

  /**
   * Return to blank screen.
   */
  navigateBlankPage() {
    return this.router.navigate(['blank']);
  }

  /**
   * Clear window history
   */
  clearHistory() {
    if (window && window.history && window.history !== undefined) {
      window.history.pushState(null, document.title, window.location.href);
    }
  }

  /**
   * Navigate with option parameters.
   * @param url Navigate based on the provided url
   * @param objectParams The parameters transfer to another page.
   */
  navigate(url: string, objectParams?: Object): Promise<boolean> {
    if (objectParams && Object.keys(objectParams).length !== 0) {
      this.transitionParams.clear();

      Object.keys(objectParams).forEach((key) => {
        this.transitionParams.set(key, objectParams[key]);
      });
    }
    return this.router.navigate([url]);
  }

  /**
   * Get value from key.
   * @param key
   */
  getParameter(transitionParams: string): any {
    return this.transitionParams.get(transitionParams);
  }

  /**
   * Get value from key when using routerLink.
   * @param key
   */
  getParameterRouterLink(key: string) {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }

  getCurrentUrl() {
    return this.router.url;
  }
}
