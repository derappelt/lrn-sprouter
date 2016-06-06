'use strict';

class LrnSpRouter extends HTMLElement {
  
  _onChanged() {
    const path = "/"+window.location.hash || "/";
    const routes = Array.from(this._routes.keys());
    const route = routes.find(r => r.test(path));
    const data = route.exec(path);
    if (!route){
      return;
    }
    
    this._newView = this._routes.get(route);
    
    console.log(this._animating);
    if(this._animating) {
      return;
    }
    this._animating = true;
    
    let outViewPromise = Promise.resolve();
        
    
    if(this._currentView){
      console.log(this._currentView);
      console.log(this._newView);
      if(this._currentView === this._newView) {
        console.log('update');
        this._animating = false;
        return this._currentView.update(data);
      }
      outViewPromise = this._currentView.out(data);
    }
    
    outViewPromise
      .then(_ => {
        console.log('resolved');
        this._currentView = this._newView;
        this._animating = false;
       })
      .then(_ => this._newView.in(data));
  }
  
  _clearRoutes(){
    this._routes.clear();
  }
  
  _createRoute(route, view){
    if (this._routes.has(route))
      return console.warn(`Route already exists: ${route}`);
      
    this._routes.set(route, view);
  }
  
  _createRoutes(){
    Array.from(document.querySelectorAll('lrn-spview'), (view)=>{
      if (!view.route)
        return;
        
      this._createRoute(new RegExp(view.route, 'i'), view);
    });
  }
  
  go(url){
    window.history.pushState(null, null, url);
    this._onChanged();
  }
  
  createdCallback(){
    this._onChanged = this._onChanged.bind(this);
    this._routes = new Map();
  }
  
  attachedCallback() {
    window.addEventListener('popstate', this._onChanged);
    this._clearRoutes();
    this._createRoutes();
    this._onChanged();
  }
  
  detachedCallback(){
    window.removeEventListener('popstate', this._onChanged);
  }
}

document.registerElement('lrn-sprouter', LrnSpRouter);
