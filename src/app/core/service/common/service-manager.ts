import { Injectable, Injector, Type, InjectionToken } from '@angular/core';
/**
 * Manage the instance of application services use in business component
 *
 * @export
 * @class ServiceManager
 */
@Injectable({
    providedIn: 'root'
})
export class ServiceManager {
    static injector: Injector;

    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws an error if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     * @template T
     * @param {(Type<T> | InjectionToken<T>)} token
     * @param {T} [notFoundValue]
     * @param {InjectFlags} [flags]
     * @returns {T}
     * @memberof ServiceManager
     */
    static get<T>(token: Type<T> | InjectionToken<T>): T {
        return ServiceManager.injector.get(token);
    }
}
