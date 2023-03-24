import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router'

export class DpReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {}
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false
    }
    let shouldReuse = false
    route.routeConfig?.data?.['reuse'] ? (shouldReuse = true) : (shouldReuse = false)
    return shouldReuse
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (handle) {
      this.handlers[this.getUrl(route)] = handle
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[this.getUrl(route)]
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null
    }
    return this.handlers[this.getUrl(route)]
  }
  //
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
    // let reUseUrl = false
    const reUseUrl = future?.routeConfig?.data?.['reuse'] || false
    const defaultReuse = future.routeConfig === current.routeConfig
    return reUseUrl || defaultReuse
  }

  /**
   * Returns a url for the current route
   * @param route
   */
  getUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((el: ActivatedRouteSnapshot) => (el.routeConfig ? el.routeConfig.path : ''))
      .filter(str => str && str.length > 0)
      .join('')
  }
}
