import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/**
 * Read config resource form environment.applicationResource
 * (assets/config/config.json)
 *
 * @export
 * @class ConfigService
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private resources: {};
  constructor(private http: HttpClient) { }

  /**
   * Get config object
   *
   * @returns {*}
   * @memberof ConfigService
   */
  public getAll(): any {
    return this.resources;
  }

  /**
   * get config value by key
   *
   * @param {*} key
   * @returns {*}
   * @memberof ConfigService
   */
  public get(key: any): any {
    return get(this.resources, key);
  }

  /**
   * Load config object from json config file
   *
   * @returns {Promise<void>}
   * @memberof ConfigService
   */
  public load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(environment.applicationResource)
        .toPromise()
        .then((resources: any) => {
          this.resources = resources;
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load file '${environment.applicationResource}': ${JSON.stringify(response)}`);
        });
    });
  }
}
